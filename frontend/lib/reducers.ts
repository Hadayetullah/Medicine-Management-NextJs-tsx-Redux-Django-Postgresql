import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import employeeReducer from "./features/employeeSlice";
import productReducer from "./features/productSlice";
import customerReducer from "./features/customerSlice";
import prescriptionsReducer from "./features/prescriptionsSlice";

// Combine reducers
export const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    employee: employeeReducer,
    customer: customerReducer,
    prescriptions: prescriptionsReducer,
});
