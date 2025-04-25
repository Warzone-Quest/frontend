import { RootState } from '@/store';

export const selectUserId = (state: RootState) => state.user.userId;
export const selectUsername = (state: RootState) => state.user.username;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserLoading = (state: RootState) => state.user.isLoading; 