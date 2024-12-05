import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import employeeReducer from "./features/employeeSlice";
import websocketReducer from "./features/websocketSlice";

// Combine reducers
export const rootReducer = combineReducers({
    auth: authReducer,
    websocket: websocketReducer,
    employee: employeeReducer,
});
