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
    customer: PrescriptionsType[];
}

const initialState: MainStateType = {
    message: null,
    error: null,
    loading: false,
    customer: [],
}

const prescriptionsSlice = createSlice({
    name: "prescriptions",
    initialState,
    reducers: {
        addPrescription: (state, action: PayloadAction<any>) => {
            state.customer.push({ ...action.payload.medicine, medicineListIndex: action.payload.index, quantity: action.payload.medicine.quantity - 1, tmpQuantity: 1 });
        },
    },
});

export const { 
    addPrescription
} = prescriptionsSlice.actions;

export default prescriptionsSlice.reducer;