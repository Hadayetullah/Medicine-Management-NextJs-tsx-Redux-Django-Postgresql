import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export type CustomerDetailType = {
    name: string;
    age: number;
    phone: string;
    address: string;
    email: string;
}

export type MedicineType = {
    name: string;
    company: string;
    category: string;
    dosage_form: string;
    price: number;
    power: number;
    quantity: number;
}

interface MainStateType {
    message: any;
    loading: boolean;
    error: any;
    CurrentCustomer: MedicineType[];
    tmpHoldedCustomers: any[];
}

const initialState: MainStateType = {
    message: null,
    error: null,
    loading: false,
    CurrentCustomer: [],
    tmpHoldedCustomers: [],
}
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
});
export default customerSlice.reducer;