import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MedicineType } from "./productSlice";

export type SinglePrescriptionType = {
    id: number;
    medicine_details: MedicineType;
    sold_quantity: number;
}

export type PrescriptionsType = {
    id: number;
    name: string;
    age: number;
    phone: string;
    address: string;
    email: string;
    customer_prescriptions: SinglePrescriptionType[];
}

interface MainStateType {
    message: any;
    loading: boolean;
    error: any;
    customersPrescriptionList: PrescriptionsType[];
}

const initialState: MainStateType = {
    message: null,
    error: null,
    loading: false,
    customersPrescriptionList: [],
}

const prescriptionsSlice = createSlice({
    name: "prescriptions",
    initialState,
    reducers: {
        setCustomersPrescriptionList: (state, action: PayloadAction<any>) => {
            state.customersPrescriptionList = action.payload.data;
        },

        setPrescriptionSliceError: (state, action: PayloadAction<{ apiError: any }>) => {
            state.error = action.payload.apiError;
        },
    },
});

export const { 
    setCustomersPrescriptionList,
    setPrescriptionSliceError,
} = prescriptionsSlice.actions;

export default prescriptionsSlice.reducer;