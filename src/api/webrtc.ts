import axios from 'axios';
import store from '../store';
import { addToast } from '../store/slices/toastSlice';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

interface WebRTCOffer {
  tournamentId: string;
  userId: string;
  sdp: string;
  type: 'offer';
}

interface WebRTCAnswer {
  tournamentId: string;
  userId: string;
  sdp: string;
  type: 'answer';
}

export const createOffer = async (offer: WebRTCOffer) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/webrtc/offer`, offer);
    store.dispatch(addToast({
      type: 'success',
      message: 'WebRTC offer created successfully',
    }));
    return response.data;
  } catch (error) {
    store.dispatch(addToast({
      type: 'error',
      message: 'Failed to create WebRTC offer',
    }));
    throw error;
  }
};

export const createAnswer = async (answer: WebRTCAnswer) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/webrtc/answer`, answer);
    store.dispatch(addToast({
      type: 'success',
      message: 'WebRTC answer created successfully',
    }));
    return response.data;
  } catch (error) {
    store.dispatch(addToast({
      type: 'error',
      message: 'Failed to create WebRTC answer',
    }));
    throw error;
  }
};

export const getOffer = async (tournamentId: string, userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/webrtc/offer/${tournamentId}/${userId}`);
    return response.data;
  } catch (error) {
    store.dispatch(addToast({
      type: 'error',
      message: 'Failed to retrieve WebRTC offer',
    }));
    throw error;
  }
};

export const getAnswer = async (tournamentId: string, userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/webrtc/answer/${tournamentId}/${userId}`);
    return response.data;
  } catch (error) {
    store.dispatch(addToast({
      type: 'error',
      message: 'Failed to retrieve WebRTC answer',
    }));
    throw error;
  }
}; 