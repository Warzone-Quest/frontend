import { PeerConnectionConfig } from '@/webrtc/types';

// Default STUN servers for NAT traversal
const DEFAULT_STUN_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

// TURN servers will be fetched from backend
let TURN_SERVERS: RTCIceServer[] = [];

/**
 * Fetches TURN server configuration from backend
 */
export const fetchTurnServers = async (): Promise<RTCIceServer[]> => {
  try {
    const response = await fetch('/api/turn-config');
    if (!response.ok) {
      throw new Error('Failed to fetch TURN configuration');
    }
    const config = await response.json();
    TURN_SERVERS = config.turnServers;
    return TURN_SERVERS;
  } catch (error) {
    console.error('Error fetching TURN servers:', error);
    return [];
  }
};

/**
 * Creates a new RTCPeerConnection with the given configuration
 */
export const createPeerConnection = async (config?: PeerConnectionConfig) => {
  // If TURN servers haven't been fetched yet, fetch them
  if (TURN_SERVERS.length === 0) {
    await fetchTurnServers();
  }

  const iceServers = [
    ...DEFAULT_STUN_SERVERS,
    ...TURN_SERVERS,
    ...(config?.turnServers || []),
  ];

  return new RTCPeerConnection({
    iceServers,
    ...config?.options,
  });
};

/**
 * Gets user media stream (audio/video)
 */
export const getUserMedia = async (constraints: MediaStreamConstraints) => {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.error('Error accessing media devices:', error);
    throw error;
  }
};

/**
 * Creates a data channel for peer-to-peer data transfer
 */
export const createDataChannel = (
  peerConnection: RTCPeerConnection,
  label: string,
  options?: RTCDataChannelInit
) => {
  return peerConnection.createDataChannel(label, options);
};

/**
 * Handles ICE candidate events
 */
export const handleIceCandidate = (
  peerConnection: RTCPeerConnection,
  onIceCandidate: (candidate: RTCIceCandidate) => void
) => {
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate(event.candidate);
    }
  };
};

/**
 * Handles ICE connection state changes
 */
export const handleIceConnectionStateChange = (
  peerConnection: RTCPeerConnection,
  onStateChange: (state: RTCIceConnectionState) => void
) => {
  peerConnection.oniceconnectionstatechange = () => {
    onStateChange(peerConnection.iceConnectionState);
  };
};

/**
 * Creates and sets local description
 */
export const createAndSetLocalDescription = async (
  peerConnection: RTCPeerConnection,
  type: 'offer' | 'answer'
) => {
  const description = type === 'offer' 
    ? await peerConnection.createOffer()
    : await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(description);
  return description;
};

/**
 * Sets remote description
 */
export const setRemoteDescription = async (
  peerConnection: RTCPeerConnection,
  description: RTCSessionDescriptionInit
) => {
  await peerConnection.setRemoteDescription(description);
}; 