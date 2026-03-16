import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index'; // Adjust the path to your store

interface AuthState {
  authToken: string | null;
}

const initialState: AuthState = {
  authToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    removeAuthToken: state => {
      state.authToken = null;
    },
  },
});

export const {setAuthToken, removeAuthToken} = authSlice.actions;

// Selector with proper RootState typing
export const selectAuthToken = (state: RootState): string | null =>
  state.auth.authToken;

export default authSlice.reducer;
