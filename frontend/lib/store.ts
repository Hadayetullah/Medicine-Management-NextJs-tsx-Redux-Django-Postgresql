// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

// import { createWebSocketMiddleware } from "@/websocketMiddleware";
// import { rootReducer } from "./reducers";


// // Middleware
// const websocketMiddleware = createWebSocketMiddleware();

// // Define RootState type
// export type RootState = ReturnType<typeof rootReducer>;

// // Define the store factory function
// export const createStore = (preloadedState?: Partial<RootState>) =>
//   configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(websocketMiddleware),
//     preloadedState,
//   });

// // Define AppDispatch type directly from the store
// // const store = createStore(); // Temporary instance to infer types
// // export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

// // Custom hook for dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>();


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
