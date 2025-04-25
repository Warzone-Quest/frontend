import { RootState } from '@/store';

export const selectToken = (state: RootState): string | null => state.auth.token;
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
