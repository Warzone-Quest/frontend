import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  setLocalDescription, 
  setRemoteDescription, 
  addIceCandidate, 
  setConnectionStatus,
  setError,
  toggleStreamMute,
  toggleStreamVideo,
  addStream
} from '../store/slices/webrtc/webrtc.slice';
import { webrtcApi } from '../api/webrtc.api';

interface WebRTCConnectionProps {
  tournamentId: string;
  userId: string;
  isProducer: boolean;
}

export const WebRTCConnection: React.FC<WebRTCConnectionProps> = ({ 
  tournamentId, 
  userId,
  isProducer 
}) => {
  const dispatch = useDispatch();
  const { 
    connectionStatus, 
    localDescription, 
    remoteDescription, 
    iceCandidates,
    streams
  } = useSelector((state: RootState) => state.webrtc);
  
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamId = `${userId}-${tournamentId}`;

  // Initialize WebRTC
  useEffect(() => {
    const initWebRTC = async () => {
      try {
        // Create peer connection
        peerConnection.current = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
          ]
        });

        // Set up event handlers
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            dispatch(addIceCandidate(event.candidate));
          }
        };

        peerConnection.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
            dispatch(addStream({
              id: `${streamId}-remote`,
              userId: 'remote',
              stream: event.streams[0],
              name: 'Remote Stream'
            }));
          }
        };

        // Get local media stream if producer
        if (isProducer) {
          localStream.current = await navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: true
          });
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream.current;
          }
          localStream.current.getTracks().forEach(track => {
            peerConnection.current?.addTrack(track, localStream.current!);
          });
          dispatch(addStream({
            id: streamId,
            userId,
            stream: localStream.current,
            name: 'Local Stream'
          }));
        }

        dispatch(setConnectionStatus('connecting'));
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to initialize WebRTC'));
        dispatch(setConnectionStatus('error'));
      }
    };

    initWebRTC();

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [dispatch, isProducer, userId, tournamentId]);

  // Handle local description
  useEffect(() => {
    const handleLocalDescription = async () => {
      if (!peerConnection.current || !localDescription) return;

      try {
        await peerConnection.current.setLocalDescription(localDescription);
        await webrtcApi.putOffer({
          tournamentId,
          producerUserId: userId,
          consumerUserId: '', // Will be set by the consumer
          offer: localDescription.sdp || '',
          answer: '',
        });
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to set local description'));
      }
    };

    handleLocalDescription();
  }, [localDescription, tournamentId, userId, dispatch]);

  // Handle remote description
  useEffect(() => {
    const handleRemoteDescription = async () => {
      if (!peerConnection.current || !remoteDescription) return;

      try {
        await peerConnection.current.setRemoteDescription(remoteDescription);
        dispatch(setRemoteDescription(remoteDescription));
        if (isProducer) {
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          dispatch(setLocalDescription(new RTCSessionDescription(answer)));
        }
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to set remote description'));
      }
    };

    handleRemoteDescription();
  }, [remoteDescription, isProducer, dispatch]);

  // Create offer if producer
  useEffect(() => {
    const createOffer = async () => {
      if (!peerConnection.current || !isProducer) return;

      try {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        dispatch(setLocalDescription(new RTCSessionDescription(offer)));
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to create offer'));
      }
    };

    createOffer();
  }, [isProducer, dispatch]);

  useEffect(() => {
    const addIceCandidates = async () => {
      if (!peerConnection.current || !iceCandidates.length) return;
      
      for (const candidate of iceCandidates) {
        try {
          await peerConnection.current.addIceCandidate(candidate);
        } catch (error) {
          console.error('Failed to add ICE candidate:', error);
        }
      }
    };

    addIceCandidates();
  }, [iceCandidates]);

  return (
    <div className="webrtc-container">
      <div className="video-container">
        <video 
          ref={localVideoRef} 
          autoPlay 
          playsInline 
          muted 
          className="local-video"
        />
        <video 
          ref={remoteVideoRef} 
          autoPlay 
          playsInline 
          className="remote-video"
        />
      </div>
      <div className="controls">
        <button onClick={() => dispatch(toggleStreamMute(streamId))}>
          {streams.find(s => s.id === streamId)?.isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={() => dispatch(toggleStreamVideo(streamId))}>
          {streams.find(s => s.id === streamId)?.isVideoOff ? 'Turn On Video' : 'Turn Off Video'}
        </button>
      </div>
      <div className="status">
        Connection Status: {connectionStatus}
      </div>
    </div>
  );
}; 