
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface employeeState {
    medicine: {
        id: number;
        company: {
            id: number;
            name: string;
            created_at: string;
            modified_at: string;
        };
        category: {
            id: number;
            name: string;
            created_at: string;
            modified_at: string;
        };
        dosage_form: {
            id: number;
            name: string;
            created_at: string;
            modified_at: string;
        };
        price: number;
        power: number;
        shelf_no: number;
        image_url: string;
        created_at: Date;
    } | null;

    loading: boolean;
    error: string | null;
}

const initialState: employeeState = {
    medicine: null,
    loading: false,
    error: null,
}



const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
})


export default employeeSlice.reducer;