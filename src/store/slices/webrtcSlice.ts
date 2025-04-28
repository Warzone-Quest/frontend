import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WebRTCState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
  isMuted: boolean;
  isVideoOff: boolean;
}

const initialState: WebRTCState = {
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  isMuted: false,
  isVideoOff: false,
};

const webrtcSlice = createSlice({
  name: 'webrtc',
  initialState,
  reducers: {
    setLocalStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.remoteStream = action.payload;
    },
    setPeerConnection: (state, action: PayloadAction<RTCPeerConnection | null>) => {
      state.peerConnection = action.payload;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    toggleVideo: (state) => {
      state.isVideoOff = !state.isVideoOff;
    },
  },
});

export const { setLocalStream, setRemoteStream, setPeerConnection, toggleMute, toggleVideo } = webrtcSlice.actions;
export default webrtcSlice.reducer; 