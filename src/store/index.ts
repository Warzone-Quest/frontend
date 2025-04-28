import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';

// Import your reducers here
import authReducer from './slices/auth/auth.slice';
import tournamentReducer from './slices/tournament/tournament.slice';
import userReducer from './slices/user/user.slice';
import webrtcReducer from './slices/webrtc/webrtc.slice';
import notificationsReducer from './slices/notificationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  tournament: tournamentReducer,
  user: userReducer,
  webrtc: webrtcReducer,
  notifications: notificationsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['webrtc/setLocalDescription', 'webrtc/setRemoteDescription'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.sdp', 'payload.candidate'],
        // Ignore these paths in the state
        ignoredPaths: ['webrtc.localDescription', 'webrtc.remoteDescription', 'webrtc.iceCandidates'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 

export default store;