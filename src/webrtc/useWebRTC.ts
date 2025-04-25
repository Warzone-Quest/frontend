import { useState, useEffect, useCallback } from 'react';
import { WebRTCState, WebRTCConfig, SignalingMessage, UserRole } from '@/webrtc/types';
import { PollingSignalingClient } from '@/webrtc/signaling';
import {
  createPeerConnection,
  getUserMedia,
  createDataChannel,
  handleIceCandidate,
  handleIceConnectionStateChange,
  createAndSetLocalDescription,
  setRemoteDescription,
} from '@/webrtc/utils';

export const useWebRTC = (config: WebRTCConfig) => {
  const [state, setState] = useState<WebRTCState>({
    peerConnection: null,
    localStream: null,
    remoteStream: null,
    dataChannel: null,
    connectionState: 'new',
    iceConnectionState: 'new',
    role: config.role,
  });

  const [signalingClient, setSignalingClient] = useState<PollingSignalingClient | null>(null);

  useEffect(() => {
    const client = new PollingSignalingClient(
      config.signalingServerUrl,
      config.pollingIntervalMs
    );
    setSignalingClient(client);

    return () => {
      client.disconnect();
    };
  }, [config.signalingServerUrl, config.pollingIntervalMs]);

  const initializePeerConnection = useCallback(async () => {
    try {
      const peerConnection = await createPeerConnection(config.peerConnectionConfig);
      const localStream = await getUserMedia(config.mediaConstraints || { video: true, audio: true });

      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      const dataChannel = createDataChannel(peerConnection, 'dataChannel');

      handleIceCandidate(peerConnection, (candidate) => {
        signalingClient?.sendMessage({
          id: crypto.randomUUID(),
          type: 'candidate',
          data: candidate,
          from: config.userId,
          to: 'remote',
          timestamp: Date.now(),
          role: config.role,
        });
      });

      handleIceConnectionStateChange(peerConnection, (iceState) => {
        setState((prev) => ({ ...prev, iceConnectionState: iceState }));
      });

      peerConnection.onconnectionstatechange = () => {
        setState((prev) => ({ ...prev, connectionState: peerConnection.connectionState }));
      };

      peerConnection.ontrack = (event) => {
        setState((prev) => ({
          ...prev,
          remoteStream: event.streams[0],
        }));
      };

      setState((prev) => ({
        ...prev,
        peerConnection,
        localStream,
        dataChannel,
      }));

      return peerConnection;
    } catch (error) {
      console.error('Error initializing peer connection:', error);
      throw error;
    }
  }, [config.peerConnectionConfig, config.mediaConstraints, signalingClient, config.userId, config.role]);

  const createOffer = useCallback(async (targetUserId: string, targetRole: UserRole) => {
    if (
      (config.role === 'admin') ||
      (config.role === 'moderator' && targetRole === 'player')
    ) {
      try {
        const peerConnection = await initializePeerConnection();
        const offer = await createAndSetLocalDescription(peerConnection, 'offer');
        
        await signalingClient?.sendMessage({
          id: crypto.randomUUID(),
          type: 'offer',
          data: offer,
          from: config.userId,
          to: targetUserId,
          timestamp: Date.now(),
          role: config.role,
        });
      } catch (error) {
        console.error('Error creating offer:', error);
        throw error;
      }
    } else {
      console.warn('Not authorized to create offers');
    }
  }, [initializePeerConnection, signalingClient, config.userId, config.role]);

  const handleSignalingMessage = useCallback(
    async (message: SignalingMessage) => {
      if (!state.peerConnection) return;

      try {
        switch (message.type) {
          case 'offer':
            if (
              (config.role === 'moderator' && message.role === 'admin') ||
              (config.role === 'player' && (message.role === 'admin' || message.role === 'moderator'))
            ) {
              await setRemoteDescription(state.peerConnection, message.data);
              const answer = await state.peerConnection.createAnswer();
              await state.peerConnection.setLocalDescription(answer);
              await signalingClient?.sendMessage({
                id: crypto.randomUUID(),
                type: 'answer',
                data: answer,
                from: config.userId,
                to: message.from,
                timestamp: Date.now(),
                role: config.role,
              });
            }
            break;

          case 'answer':
            await setRemoteDescription(state.peerConnection, message.data);
            break;

          case 'candidate':
            await state.peerConnection.addIceCandidate(message.data);
            break;

          default:
            console.warn('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error handling signaling message:', error);
      }
    },
    [state.peerConnection, signalingClient, config.userId, config.role]
  );

  useEffect(() => {
    if (signalingClient) {
      signalingClient.onMessage(handleSignalingMessage);
    }
  }, [signalingClient, handleSignalingMessage]);

  return {
    state,
    createOffer,
    initializePeerConnection,
  };
}; 