import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import productReducer from "./features/productSlice";
import customerReducer from "./features/customerSlice";
import prescriptionsReducer from "./features/prescriptionsSlice";
import commonReducer from "./features/commonSlice";

// Combine reducers
export const rootReducer = combineReducers({
    common: commonReducer,
    auth: authReducer,
    product: productReducer,
    customer: customerReducer,
    prescriptions: prescriptionsReducer,
});
