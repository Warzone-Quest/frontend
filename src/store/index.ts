// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer, { AuthState } from './slices/authSlice';
import userReducer, { UserState } from './slices/userSlice';
import tournamentReducer, { TournamentState } from './slices/tournamentSlice';
import webrtcReducer, { WebRTCState } from './slices/webrtcSlice';
import notificationReducer, { NotificationState } from './slices/notificationSlice';
import toastReducer, { ToastState } from './slices/toastSlice';

// Define the root state type
export interface RootState {
  auth: AuthState;
  user: UserState;
  tournament: TournamentState;
  webrtc: WebRTCState;
  notification: NotificationState;
  toast: ToastState;
}

// Create the store
const store = configureStore<RootState>({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tournament: tournamentReducer,
    webrtc: webrtcReducer,
    notification: notificationReducer,
    toast: toastReducer,
  },
});

// Export the store and types
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
