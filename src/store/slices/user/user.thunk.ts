import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi, UserProfile } from '@/api/user.api';

export const fetchUserProfileThunk = createAsyncThunk<UserProfile, void>(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await userApi.fetchProfile();
      
      // Store in localStorage
      localStorage.setItem('userId', data.id);
      localStorage.setItem('username', data.username);
      
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
); 