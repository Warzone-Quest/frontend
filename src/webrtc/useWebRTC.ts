import { useState, useCallback } from 'react';
import { UserRole } from './types';

interface UseWebRTCOptions {
  role: UserRole;
  userId: string;
  signalingServerUrl: string;
  mediaConstraints: {
    video: boolean;
    audio: boolean;
  };
}

interface WebRTCState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: string | null;
}

export const useWebRTC = (options: UseWebRTCOptions) => {
  const [state, setState] = useState<WebRTCState>({
    localStream: null,
    remoteStream: null,
    connectionStatus: 'disconnected',
    error: null
  });

  const createOffer = useCallback(async (targetUserId: string, targetRole: UserRole) => {
    try {
      setState(prev => ({ ...prev, connectionStatus: 'connecting' }));
      // Implement WebRTC offer creation logic here
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        connectionStatus: 'error',
        error: error instanceof Error ? error.message : 'Failed to create offer'
      }));
    }
  }, []);

  return {
    state,
    createOffer
  };
}; 