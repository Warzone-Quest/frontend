import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES, STATUS_CODES } from '@/config/constants';

export interface Credentials {
  username: string;
  password: string;
}

export interface SignupData extends Credentials {
  email: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export const authApi = {
  login: async (credentials: Credentials): Promise<AuthResponse> => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.AUTH.LOGIN,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.SIGNUP, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.AUTH.SIGNUP,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.AUTH.LOGOUT,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  otpRegister: async (email: string): Promise<void> => {
    try {
      await axios.post(API_ENDPOINTS.AUTH.OTP_REGISTER, { email });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.AUTH.OTP_REGISTER,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  otpVerify: async (email: string, otp: string): Promise<void> => {
    try {
      await axios.post(API_ENDPOINTS.AUTH.OTP_VERIFY, { email, otp });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.AUTH.OTP_VERIFY,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  otpResend: async (email: string): Promise<void> => {
    try {
      await axios.post(API_ENDPOINTS.AUTH.OTP_RESEND, { email });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.AUTH.OTP_RESEND,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  }
};
