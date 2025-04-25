// src/features/auth/authHooks.ts
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store';
import { loginThunk, logoutThunk } from '@/store/slices/auth/auth.thunk';

export const useAuthStatus = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);
  return { isAuthenticated, token };
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return (credentials: { username: string; password: string }) => dispatch(loginThunk(credentials));
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(logoutThunk());
};
