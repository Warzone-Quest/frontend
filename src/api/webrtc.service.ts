import api from './config';

export interface WebRTCOffer {
  tournamentId: string;
  userId: string;
  offer: string;
}

export interface WebRTCAnswer {
  tournamentId: string;
  userId: string;
  answer: string;
}

export interface SignalingMessage {
  message: string;
  recipientId: string;
}

export interface ConnectionStatus {
  connectionId: string;
  status: 'connected' | 'disconnected';
}

export const webrtcService = {
  // Create Offer
  createOffer: async (data: WebRTCOffer): Promise<void> => {
    await api.post('/webrtc/offer', data);
  },

  // Create Answer
  createAnswer: async (data: WebRTCAnswer): Promise<void> => {
    await api.post('/webrtc/answer', data);
  },

  // Get Offer
  getOffer: async (tournamentId: string, userId: string): Promise<string> => {
    const response = await api.get(`/webrtc/offer/${tournamentId}/${userId}`);
    return response.data.offer;
  },

  // Get Answer
  getAnswer: async (tournamentId: string, userId: string): Promise<string> => {
    const response = await api.get(`/webrtc/answer/${tournamentId}/${userId}`);
    return response.data.answer;
  },

  // Send Signaling Message
  sendMessage: async (data: SignalingMessage): Promise<void> => {
    await api.post('/signaling/send', data);
  },

  // Poll Messages
  pollMessages: async (): Promise<SignalingMessage[]> => {
    const response = await api.get('/signaling/poll');
    return response.data;
  },

  // Update Connection Status
  updateConnection: async (data: ConnectionStatus): Promise<void> => {
    await api.post('/signaling/connection', data);
  },

  // Get Connections
  getConnections: async (): Promise<ConnectionStatus[]> => {
    const response = await api.get('/signaling/connections');
    return response.data;
  }
}; 