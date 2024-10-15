import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './features/authSlice'


const store = configureStore({
  reducer: {
    auth: authReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;