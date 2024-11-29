import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './features/authSlice';
import employeeReducer from './features/employeeSlice';
import websocketReducer from './features/websocketSlice';

import { createWebSocketMiddleware } from '@/websocketMiddleware';


const websocketMiddleware = createWebSocketMiddleware();


const store = configureStore({
  reducer: {
    auth: authReducer,
    websocket: websocketReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;