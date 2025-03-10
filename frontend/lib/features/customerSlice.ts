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
        addOrUpdateMedicine: (state, action: PayloadAction<any>) => {
            const existingMedicineIndex = state.tmpInvoice.findIndex(
              (medicine) => medicine?.name === action.payload?.name
            );
      
            if (existingMedicineIndex !== -1) {
              // If the medicine exists, update quantity
              state.tmpInvoice[existingMedicineIndex].quantity += 1;
            } else {
              // If the medicine doesn't exist, add a new entry
              state.tmpInvoice.push({ ...action.payload, quantity: 1 });
            }
          },
    },
});

export const { addOrUpdateMedicine } = customerSlice.actions;
export default customerSlice.reducer;