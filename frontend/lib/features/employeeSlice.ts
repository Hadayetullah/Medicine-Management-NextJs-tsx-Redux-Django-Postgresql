
import { getTokensFromCookies } from "@/lib/actions";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export type medicineState = {
    medicine: {
        id: string;
        company: {
            id: string;
            name: string;
            created_at: string;
            modified_at: string;
        };
        category: {
            id: string;
            name: string;
            created_at: string;
            modified_at: string;
        };
        dosage_form: {
            id: string;
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
}

interface employeeState {
    medicineList: medicineState[];
    loading: boolean;
    error: string | null;
}

const initialState: employeeState = {
    medicineList: [],
    loading: false,
    error: null,
}



// Async thunk for Adding Medicine
// export const addMedicine = createAsyncThunk(
//     "employee/addMedicine",
//     async(formData: {company: string, category: string, dosage_form: string, price: string, power: string, shelf_no: string}, {rejectWithValue}) => {
//         try {
//             const {accessToken} = getTokensFromCookies()
//             const response = await axios.post('http://localhost:8000/api/employee/add-medicine/', formData, {
//                 headers: {
//                     'accept': 'application/json',
//                     "Content-Type": 'application/json',
//                     'Authorization': `Bearer ${accessToken}`
//                 }
//             })

//             return response.data
//         } catch (error: any){
//             return rejectWithValue(error.response?.data || error.message)
//         }
//     }
// )



const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder.addCase(addMedicine.pending, (state) => {
    //         state.loading = true
    //     });
    //     builder.addCase(addMedicine.fulfilled, (state, action) => {
    //         state.loading = false,
    //         state.medicineList = [...state.medicineList, action.payload.medicine]
    //     })
    //     builder.addCase(addMedicine.rejected, (state, action: PayloadAction<any>) => {
    //         state.error = action.payload?.detail || "Something went wrong"
    //     })
    // },
})


export const {} = employeeSlice.actions
export default employeeSlice.reducer;