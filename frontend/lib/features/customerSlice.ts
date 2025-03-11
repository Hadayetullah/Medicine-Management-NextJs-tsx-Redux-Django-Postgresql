import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MedicineType = {
    name: string;
    company: string;
    category: string;
    dosage_form: string;
    price: number;
    power: number;
    quantity: number;
}

export type PrescriptionDetailType = {
    name: string;
    age: number;
    phone: string;
    address: string;
    email: string;
    medicine_data: MedicineType[]
}

export type InvoiceType = {
    id: string;
    name: string;
    company: string;
    category: string;
    dosage_form: string;
    power: string;
    price: number;
    quantity: number;
}

export type CustomerType = {
    name: string;
    age: number;
    phone: string;
    address: string;
    email: string;
    medicine_data: InvoiceType[]
}

interface MainStateType {
    message: any;
    loading: boolean;
    error: any;
    CurrentCustomer: PrescriptionDetailType | null;
    tmpHoldedCustomers: any[];
    tmpInvoice: InvoiceType[];
}

const initialState: MainStateType = {
    message: null,
    error: null,
    loading: false,
    CurrentCustomer: null,
    tmpHoldedCustomers: [],
    tmpInvoice: [],
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addTmpMedicine: (state, action: PayloadAction<any>) => {
            console.log("addTmpMedicine action : ", action)
            state.tmpInvoice.push({ ...action.payload, quantity: 1 });
        },

        updateTmpMedicine: (state, action: PayloadAction<any>) => {
            console.log("state.tmpInvoice : ",  state.tmpInvoice)
            console.log("updateTmpMedicine action : ", action)
            state.tmpInvoice[action.payload].quantity += 1;
        },
    },
});

export const { addTmpMedicine, updateTmpMedicine } = customerSlice.actions;
export default customerSlice.reducer;