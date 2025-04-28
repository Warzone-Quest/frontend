import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  userId: string;
  userEmailId: string;
  name: string;
  isEmailVerified: boolean;
  profilePicture?: string;
  bannerImage?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  followers: UserProfile[];
  following: UserProfile[];
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  followers: [],
  following: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setFollowers: (state, action: PayloadAction<UserProfile[]>) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action: PayloadAction<UserProfile[]>) => {
      state.following = action.payload;
    },
    addFollower: (state, action: PayloadAction<UserProfile>) => {
      if (!state.followers.some(f => f.userId === action.payload.userId)) {
        state.followers.push(action.payload);
        if (state.profile) {
          state.profile.followersCount += 1;
        }
      }
    },
    removeFollower: (state, action: PayloadAction<string>) => {
      state.followers = state.followers.filter(f => f.userId !== action.payload);
      if (state.profile) {
        state.profile.followersCount = Math.max(0, state.profile.followersCount - 1);
      }
    },
    addFollowing: (state, action: PayloadAction<UserProfile>) => {
      if (!state.following.some(f => f.userId === action.payload.userId)) {
        state.following.push(action.payload);
        if (state.profile) {
          state.profile.followingCount += 1;
        }
      }
    },
    removeFollowing: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(f => f.userId !== action.payload);
      if (state.profile) {
        state.profile.followingCount = Math.max(0, state.profile.followingCount - 1);
      }
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfile,
  setFollowers,
  setFollowing,
  addFollower,
  removeFollower,
  addFollowing,
  removeFollowing,
} = userSlice.actions;

export default userSlice.reducer; 