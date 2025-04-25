import api from './config';

export interface LoginCredentials {
  userEmailId: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface OTPData {
  email: string;
  otp?: string;
}

export const authService = {
  // OTP Registration
  registerOTP: async (data: OTPData) => {
    const response = await api.post('/auth/otp/register', data);
    return response.data;
  },

  // Resend OTP
  resendOTP: async (data: OTPData) => {
    const response = await api.post('/auth/otp/resend', data);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (data: OTPData) => {
    const response = await api.post('/auth/otp/verify', data);
    return response.data;
  },

  // Login
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Signup
  signup: async (data: SignupData) => {
    const response = await api.put('/auth/signup', data);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Refresh Token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  // Check Authentication Status
  checkAuth: async () => {
    try {
      const response = await api.get('/auth/check');
      return response.data;
    } catch (error) {
      return null;
    }
  }
}; 