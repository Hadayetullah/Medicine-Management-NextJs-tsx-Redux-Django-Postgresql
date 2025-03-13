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
    medicineListIndex: number;
    tmpQuantity: number;
    id: string;
    name: string;
    company: {
        id: string;
        name: string;
        created_at: string;
        modified_at: string;
    };
    category: {
        id: string | null;
        name: string | null;
        created_at: string | null;
        modified_at: string | null;
    } | null;
    dosage_form: {
        id: string | null;
        name: string | null;
        created_at: string | null;
        modified_at: string | null;
    } | null;
    price: number;
    power: number;
    quantity: number;
    shelf_no: number;
    image_url: string | null;
    created_at: Date;
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
            state.tmpInvoice.push({ ...action.payload.medicine, medicineListIndex: action.payload.index, quantity: action.payload.medicine.quantity - 1, tmpQuantity: 1 });
        },

        IncreaseTmpMedicineQuantity: (state, action: PayloadAction<any>) => {
            const obj = state.tmpInvoice[action.payload];
            state.tmpInvoice[action.payload] = {...obj, quantity: obj.quantity - 1, tmpQuantity: obj.tmpQuantity + 1 }
        },

        decreaseTmpMedicineQuantity: (state, action: PayloadAction<any>) => {
            const obj = state.tmpInvoice[action.payload];
            state.tmpInvoice[action.payload] = {...obj, quantity: obj.quantity + 1, tmpQuantity: obj.tmpQuantity - 1 }
            // state.tmpInvoice[action.payload].tmpQuantity -= 1;
        },

        removeTmpMedicine: (state, action: PayloadAction<number>) => {
            state.tmpInvoice = state.tmpInvoice.filter((_, index) => index !== action.payload);
        },
        
    },
});

export const { addTmpMedicine, IncreaseTmpMedicineQuantity, decreaseTmpMedicineQuantity, removeTmpMedicine } = customerSlice.actions;
export default customerSlice.reducer;