import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NotificationModel, userApi } from '@/api/user.api';
import { NotificationsState } from '../types/notifications.types';

const initialState: NotificationsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (userId: string) => {
    const response = await userApi.fetchNotifications(userId);
    return response;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      });
  },
});

export const { clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer; 