import axiosInstance from '@/api/axiosConfig';
import { AxiosError } from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES, STATUS_CODES } from '@/config/constants';

interface WebRTCModel {
  tournamentId: string;
  producerUserId: string;
  consumerUserId: string;
  offer: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}
  
interface ApiError {
  message: string;
  status: number;
}

export const webrtcApi = {
  putOffer: async (data: Omit<WebRTCModel, 'createdAt' | 'updatedAt'>): Promise<WebRTCModel> => {
    try {
      const response = await axiosInstance.put<WebRTCModel>(API_ENDPOINTS.WEBRTC.PUT_OFFER, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.WEBRTC.PUT_OFFER,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  putAnswer: async (data: Omit<WebRTCModel, 'createdAt' | 'updatedAt'>): Promise<WebRTCModel> => {
    try {
      const response = await axiosInstance.put<WebRTCModel>(API_ENDPOINTS.WEBRTC.PUT_ANSWER, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.WEBRTC.PUT_ANSWER,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  getOffer: async (tournamentId: string, userId: string): Promise<WebRTCModel> => {
    try {
      const response = await axiosInstance.get<WebRTCModel>(
        API_ENDPOINTS.WEBRTC.GET_OFFER
          .replace(':tournamentId', tournamentId)
          .replace(':userId', userId)
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.WEBRTC.GET_OFFER,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  getAnswer: async (tournamentId: string, userId: string): Promise<WebRTCModel> => {
    try {
      const response = await axiosInstance.get<WebRTCModel>(
        API_ENDPOINTS.WEBRTC.GET_ANSWER
          .replace(':tournamentId', tournamentId)
          .replace(':userId', userId)
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.WEBRTC.GET_ANSWER,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  }
};
