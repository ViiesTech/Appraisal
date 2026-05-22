import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import conversationReducer from './slices/conversationSlice';
import { apiSlice } from './api/apiSlice';

const appReducer = combineReducers({
  auth: authReducer,
  conversation: conversationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE') {
    // clear persisted storage as well
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [apiSlice.reducerPath], // never persist RTK Query cache
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
