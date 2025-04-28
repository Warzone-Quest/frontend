import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stream, WebRTCState } from '../../../webrtc/types';

const initialState: WebRTCState = {
  localDescription: null,
  remoteDescription: null,
  iceCandidates: [],
  connectionStatus: 'disconnected',
  error: null,
  currentTournamentId: null,
  currentUserId: null,
  streams: [],
  activeStreamId: null,
};

const webrtcSlice = createSlice({
  name: 'webrtc',
  initialState,
  reducers: {
    setLocalDescription: (state, action: PayloadAction<RTCSessionDescription>) => {
      state.localDescription = action.payload;
    },
    setRemoteDescription: (state, action: PayloadAction<RTCSessionDescription>) => {
      state.remoteDescription = action.payload;
    },
    addIceCandidate: (state, action: PayloadAction<RTCIceCandidate>) => {
      state.iceCandidates.push(action.payload);
    },
    clearIceCandidates: (state) => {
      state.iceCandidates = [];
    },
    setConnectionStatus: (state, action: PayloadAction<WebRTCState['connectionStatus']>) => {
      state.connectionStatus = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentTournament: (state, action: PayloadAction<string | null>) => {
      state.currentTournamentId = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<string | null>) => {
      state.currentUserId = action.payload;
    },
    addStream: (state, action: PayloadAction<Omit<Stream, 'isMuted' | 'isVideoOff'>>) => {
      state.streams.push({
        ...action.payload,
        isMuted: false,
        isVideoOff: false,
      });
    },
    removeStream: (state, action: PayloadAction<string>) => {
      state.streams = state.streams.filter(stream => stream.id !== action.payload);
      if (state.activeStreamId === action.payload) {
        state.activeStreamId = state.streams[0]?.id || null;
      }
    },
    toggleStreamMute: (state, action: PayloadAction<string>) => {
      const stream = state.streams.find(s => s.id === action.payload);
      if (stream) {
        stream.isMuted = !stream.isMuted;
      }
    },
    toggleStreamVideo: (state, action: PayloadAction<string>) => {
      const stream = state.streams.find(s => s.id === action.payload);
      if (stream) {
        stream.isVideoOff = !stream.isVideoOff;
      }
    },
    setActiveStream: (state, action: PayloadAction<string | null>) => {
      state.activeStreamId = action.payload;
    },
    updateStream: (state, action: PayloadAction<Partial<Stream> & { id: string }>) => {
      const index = state.streams.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.streams[index] = { ...state.streams[index], ...action.payload };
      }
    },
    resetWebRTCState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setLocalDescription,
  setRemoteDescription,
  addIceCandidate,
  clearIceCandidates,
  setConnectionStatus,
  setError,
  setCurrentTournament,
  setCurrentUser,
  addStream,
  removeStream,
  toggleStreamMute,
  toggleStreamVideo,
  setActiveStream,
  updateStream,
  resetWebRTCState,
} = webrtcSlice.actions;

export default webrtcSlice.reducer; 