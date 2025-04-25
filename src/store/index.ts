// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from '@/store/slices/auth/auth.slice';
import userReducer from '@/store/slices/user/user.slice';
import tournamentReducer from '@/store/slices/tournament/tournament.slice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tournament: tournamentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
