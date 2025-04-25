import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/api/auth.service';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    userId: string;
    email: string;
    name: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setUser, logout } = authSlice.actions;

// Thunks
export const login = (credentials: { userEmailId: string; password: string }) => 
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await authService.login(credentials);
      dispatch(setUser(response.user));
      localStorage.setItem('jwt_token', response.token);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signup = (data: { email: string; password: string; name: string }) => 
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await authService.signup(data);
      dispatch(setUser(response.user));
      localStorage.setItem('jwt_token', response.token);
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const checkAuth = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const response = await authService.checkAuth();
    if (response) {
      dispatch(setUser(response.user));
    }
  } catch (error) {
    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
  }
};

export const handleLogout = () => async (dispatch: any) => {
  try {
    await authService.logout();
  } finally {
    dispatch(logout());
    localStorage.removeItem('jwt_token');
  }
};

export default authSlice.reducer; 