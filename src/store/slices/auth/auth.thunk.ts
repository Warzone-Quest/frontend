import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi, Credentials, SignupData, ApiError } from '@/api/auth.api';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const { token } = await authApi.login(credentials);
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (data: SignupData, { rejectWithValue }) => {
    try {
      const { token } = await authApi.signup(data);
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem('token');
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);
