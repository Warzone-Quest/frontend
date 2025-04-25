import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES, STATUS_CODES } from '@/config/constants';

export interface UserProfile {
  id: string;
  username: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export const userApi = {
  fetchProfile: async (): Promise<UserProfile> => {
    try {
      const response = await axios.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.PROFILE,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  }
}; 