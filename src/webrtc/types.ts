export type UserRole = 'moderator' | 'player';

export interface Stream {
  id: string;
  userId: string;
  stream: MediaStream | null;
  isMuted: boolean;
  isVideoOff: boolean;
  name: string;
}

export interface WebRTCState {
  localDescription: RTCSessionDescription | null;
  remoteDescription: RTCSessionDescription | null;
  iceCandidates: RTCIceCandidate[];
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: string | null;
  currentTournamentId: string | null;
  currentUserId: string | null;
  streams: Stream[];
  activeStreamId: string | null;
} 