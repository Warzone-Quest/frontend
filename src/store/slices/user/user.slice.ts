import { createSlice } from '@reduxjs/toolkit';
import { fetchUserProfileThunk } from '@/store/slices/user/user.thunk';

export interface UserState {
  userId: string | null;
  username: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: UserState = {
  userId: localStorage.getItem('userId') || null,
  username: localStorage.getItem('username') || null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(fetchUserProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
