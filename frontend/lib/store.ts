import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './features/authSlice';
import employeeReducer from './features/employeeSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;