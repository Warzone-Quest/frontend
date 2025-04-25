import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { webrtcService, WebRTCOffer, WebRTCAnswer, SignalingMessage, ConnectionStatus } from '@/api/webrtc.service';

export interface WebRTCState {
  offers: Record<string, string>;
  answers: Record<string, string>;
  messages: SignalingMessage[];
  connections: ConnectionStatus[];
  loading: boolean;
  error: string | null;
}

const initialState: WebRTCState = {
  offers: {},
  answers: {},
  messages: [],
  connections: [],
  loading: false,
  error: null,
};

const webrtcSlice = createSlice({
  name: 'webrtc',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOffer: (state, action: PayloadAction<{ key: string; offer: string }>) => {
      state.offers[action.payload.key] = action.payload.offer;
    },
    setAnswer: (state, action: PayloadAction<{ key: string; answer: string }>) => {
      state.answers[action.payload.key] = action.payload.answer;
    },
    addMessage: (state, action: PayloadAction<SignalingMessage>) => {
      state.messages.push(action.payload);
    },
    setConnections: (state, action: PayloadAction<ConnectionStatus[]>) => {
      state.connections = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setOffer,
  setAnswer,
  addMessage,
  setConnections,
  clearMessages,
} = webrtcSlice.actions;

// Thunks
export const createOffer = (data: WebRTCOffer) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await webrtcService.createOffer(data);
    const key = `${data.tournamentId}-${data.userId}`;
    dispatch(setOffer({ key, offer: data.offer }));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createAnswer = (data: WebRTCAnswer) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await webrtcService.createAnswer(data);
    const key = `${data.tournamentId}-${data.userId}`;
    dispatch(setAnswer({ key, answer: data.answer }));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchOffer = (tournamentId: string, userId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const offer = await webrtcService.getOffer(tournamentId, userId);
    const key = `${tournamentId}-${userId}`;
    dispatch(setOffer({ key, offer }));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchAnswer = (tournamentId: string, userId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const answer = await webrtcService.getAnswer(tournamentId, userId);
    const key = `${tournamentId}-${userId}`;
    dispatch(setAnswer({ key, answer }));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const sendSignalingMessage = (message: SignalingMessage) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await webrtcService.sendMessage(message);
    dispatch(addMessage(message));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const pollSignalingMessages = () => async (dispatch: any) => {
  try {
    const messages = await webrtcService.pollMessages();
    messages.forEach(message => dispatch(addMessage(message)));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const updateConnectionStatus = (status: ConnectionStatus) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await webrtcService.updateConnection(status);
    const connections = await webrtcService.getConnections();
    dispatch(setConnections(connections));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default webrtcSlice.reducer; 