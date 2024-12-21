import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import employeeReducer from "./features/employeeSlice";
import productReducer from "./features/productSlice";

// Combine reducers
export const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    employee: employeeReducer,
});
