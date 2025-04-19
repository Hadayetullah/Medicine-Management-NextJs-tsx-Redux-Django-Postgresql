import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// const initialState: MainStateType = {
//     message: null,
//     error: null,
//     loading: false,
//     CurrentCustomer: null,
//     tmpCustomerPrescription: {
//         name: '',
//         age: 0,
//         phone: '',
//         address: '',
//         email: '',
//         tmpInvoice: [],
//     },
//     tmpHoldedCustomers: [],
// }

export type MedicineType = {
    name: string;
    company: string;
    category: string;
    dosage_form: string;
    price: number;
    power: number;
    quantity: number;
}

export type CustomerDetailType = {
    name: string;
    age: number;
    phone: string;
    email: string;
    address: string;
}

export type TmpInvoiceType = {
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

export type TmpCustomerPrescriptionType = {
    name: string;
    age: string;
    phone: string;
    address: string;
    email: string;
    tmpInvoice: TmpInvoiceType[];
}

interface MainStateType {
    message: any;
    loading: boolean;
    error: any;
    currentCustomer: boolean;
    tmpCustomerPrescription: TmpCustomerPrescriptionType;
    tmpHoldedCustomers: TmpCustomerPrescriptionType[];
}

const initialState: MainStateType = {
    message: null,
    error: null,
    loading: false,
    currentCustomer: false,
    tmpCustomerPrescription: {
        name: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        tmpInvoice: [],
    },
    tmpHoldedCustomers: [],
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addTmpMedicine: (state, action: PayloadAction<any>) => {
            state.tmpCustomerPrescription.tmpInvoice.push({ ...action.payload.medicine, medicineListIndex: action.payload.index, quantity: action.payload.medicine.quantity - 1, tmpQuantity: 1 });
        },

        IncreaseTmpMedicineQuantity: (state, action: PayloadAction<any>) => {
            const obj = state.tmpCustomerPrescription.tmpInvoice[action.payload];
            state.tmpCustomerPrescription.tmpInvoice[action.payload] = {...obj, quantity: obj.quantity - 1, tmpQuantity: obj.tmpQuantity + 1 }
        },

        decreaseTmpMedicineQuantity: (state, action: PayloadAction<any>) => {
            const obj = state.tmpCustomerPrescription.tmpInvoice[action.payload];
            state.tmpCustomerPrescription.tmpInvoice[action.payload] = {...obj, quantity: obj.quantity + 1, tmpQuantity: obj.tmpQuantity - 1 }
            // state.tmpCustomerPrescription?.tmpInvoice[action.payload].tmpQuantity -= 1;
        },

        removeTmpMedicine: (state, action: PayloadAction<number>) => {
            state.tmpCustomerPrescription.tmpInvoice = state.tmpCustomerPrescription.tmpInvoice.filter((_, index) => index !== action.payload);
        },

        updateOrAddTmpCustomerInfo: (state, action: PayloadAction<{
            customerData: Omit<TmpCustomerPrescriptionType, 'tmpInvoice'>;
            currentCustomer: boolean;
        }>) => {
            state.tmpCustomerPrescription = {...state.tmpCustomerPrescription, ...action.payload.customerData};
            state.currentCustomer = action.payload.currentCustomer;
        },

        resetTmpCustomerAndInvoice: (state) => {
            state.currentCustomer = false;
            state.tmpCustomerPrescription.tmpInvoice = [];
        },

        holdTmpCustomer: (state) => {
            state.tmpHoldedCustomers.push(state.tmpCustomerPrescription);
            state.currentCustomer = false;
            state.tmpCustomerPrescription = {
                name: '',
                age: '',
                phone: '',
                email: '',
                address: '',
                tmpInvoice: [],
            };
        },

        replaceTmpCustomerPrescription: (state, action: PayloadAction<TmpCustomerPrescriptionType>) => {
            state.tmpCustomerPrescription = action.payload;
        },
        
    },
});

export const { 
    addTmpMedicine, 
    IncreaseTmpMedicineQuantity, 
    decreaseTmpMedicineQuantity, 
    removeTmpMedicine, 
    updateOrAddTmpCustomerInfo, 
    resetTmpCustomerAndInvoice,
    holdTmpCustomer,
    replaceTmpCustomerPrescription
} = customerSlice.actions;

export default customerSlice.reducer;