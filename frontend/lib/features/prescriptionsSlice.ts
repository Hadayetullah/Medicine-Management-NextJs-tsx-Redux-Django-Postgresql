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
    prescriptionsSliceMsg: string;
    loading: boolean;
    error: any;
    customersPrescriptionList: PrescriptionsType[];
}

const initialState: MainStateType = {
    prescriptionsSliceMsg: '',
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

        addNewCustomer: (state, action: PayloadAction<any>) => {
            state.prescriptionsSliceMsg = action.payload.data.message;
            state.customersPrescriptionList.push(action.payload.data.customer);
        },

        setPrescriptionsSliceMsg: (state, action: PayloadAction<any>) => {
            state.prescriptionsSliceMsg = action.payload.message;
        },
    },
});

export const { 
    setCustomersPrescriptionList,
    setPrescriptionSliceError,
    addNewCustomer,
    setPrescriptionsSliceMsg,
} = prescriptionsSlice.actions;

export default prescriptionsSlice.reducer;