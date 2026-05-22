import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store'; // Adjust the path to your store
import { apiSlice } from '../api/apiSlice';

interface AuthState {
  authToken: string | null;
  user: any | null;
  isGoogleSignin: boolean;
}

const initialState: AuthState = {
  authToken: null,
  user: null,
  isGoogleSignin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setCredentials: (state, action: PayloadAction<{ token?: string; user: any; isGoogleSignin?: boolean }>) => {
      if (action.payload.token !== undefined) {
        state.authToken = action.payload.token;
      }
      state.user = action.payload.user;
      state.isGoogleSignin = action.payload.isGoogleSignin ?? false;
    },
    removeAuthToken: state => {
      state.authToken = null;
      state.user = null;
      state.isGoogleSignin = false;
    },
  },
  // Whenever getProfile resolves anywhere in the app, merge the fresh
  // appraiser data into state.auth.user so every component that reads
  // from the auth selector automatically gets updated stats/profile.
  extraReducers: builder => {
    builder.addMatcher(
      (apiSlice.endpoints as any).getProfile.matchFulfilled,
      (state, action: any) => {
        const freshAppraiser = action.payload?.appraiser;
        if (freshAppraiser && state.user) {
          state.user = { ...state.user, ...freshAppraiser };
        }
      },
    );
  },
});

export const { setAuthToken, setCredentials, removeAuthToken } = authSlice.actions;

// Selector with proper RootState typing
export const selectAuthToken = (state: RootState): string | null =>
  state.auth.authToken;

export const selectCurrentUser = (state: RootState): any | null =>
  state.auth.user;

export const selectIsGoogleSignin = (state: RootState): boolean =>
  state.auth.isGoogleSignin;

export default authSlice.reducer;
