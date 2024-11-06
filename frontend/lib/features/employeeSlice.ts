
import { getTokensFromCookies } from "@/actions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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



// Async thunk for Adding Medicine
export const addMedicine = createAsyncThunk(
    "employee/addMedicine",
    async(formData: {company: string, category: string, dosage_form: string, price: string, power: string, shelf_no: string}, {rejectWithValue}) => {
        try {
            const {accessToken} = getTokensFromCookies()
            const response = await axios.post('http://localhost:8000/api/employee/add-medicine/', formData, {
                headers: {
                    'accept': 'application/json',
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            return response
        } catch (error: any){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)



const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
})


export default employeeSlice.reducer;