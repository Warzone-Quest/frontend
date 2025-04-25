export interface PeerConnectionConfig {
  turnServers?: RTCIceServer[];
  options?: RTCConfiguration;
}

export type UserRole = 'admin' | 'moderator' | 'player';

export interface SignalingMessage {
  id: string;
  type: 'offer' | 'answer' | 'candidate' | 'error';
  data: any;
  from: string;
  to: string;
  timestamp: number;
  role: UserRole;
}

export interface WebRTCState {
  peerConnection: RTCPeerConnection | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  dataChannel: RTCDataChannel | null;
  connectionState: RTCPeerConnectionState;
  iceConnectionState: RTCIceConnectionState;
  role: UserRole;
}

export interface WebRTCConfig {
  signalingServerUrl: string;
  peerConnectionConfig?: PeerConnectionConfig;
  mediaConstraints?: MediaStreamConstraints;
  pollingIntervalMs?: number;
  role: UserRole;
  userId: string;
}

export interface SignalingClient {
  connect: () => Promise<void>;
  disconnect: () => void;
  sendMessage: (message: SignalingMessage) => Promise<void>;
  onMessage: (callback: (message: SignalingMessage) => void) => void;
} 