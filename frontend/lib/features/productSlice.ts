
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// interface WebSocketState {
//   connected: boolean;
//   messages: any[]; // Use specific types for the message payloads (For later)
//   error: string | null;
// }

// const initialState: WebSocketState = {
//   connected: false,
//   messages: [],
//   error: null,
// };

// interface MedicineFormData {
//   company: string;
//   category: string;
//   dosage_form: string;
//   price: string;
//   power: string;
//   shelf_no: string;
// };

// export type AddMedicineRequest = {
//   formData: MedicineFormData;
//   token: string;
// };

export type MedicineType = {
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
    shelf_no: number;
    image_url: string | null;
    created_at: Date;
}

export type WebSocketState = {
  [connectionKey: string]: {
    connected: boolean;
    error?: any;
    messages: any;
  };
}

export type connectionDetailsType = {
  connectionKey: string;
  connectionUrl: string;
}

interface MainStateType {
  connectionDetails: connectionDetailsType[];
  subAction: string;
  message: any;
  loading: boolean;
  error: any;
  connections: WebSocketState;
  medicineList: MedicineType[];
}

const initialState: MainStateType = {
  connectionDetails: [
    {
      connectionKey: "medicineConnection",
      connectionUrl: "product/medicine",
    },
  ],
  subAction: "",
  message: null,
  error: null,
  loading: false,
  connections: {},
  medicineList: [],
};



// Async thunk to fetch all medicines
// export const fetchMedicines = createAsyncThunk(
//   "employee/addMedicine",
//   async(data: AddMedicineRequest, {rejectWithValue}) => {
//       try {
//           const response = await axios.post('http://localhost:8000/api/employee/add-medicine/', data.formData, {
//               headers: {
//                   'accept': 'application/json',
//                   "Content-Type": 'application/json',
//                   'Authorization': `Bearer ${data.token}`
//               }
//           })

//           return response
//       } catch (error: any){
//           return rejectWithValue(error.response?.data || error.message)
//       }
//   }
// )


// export const fetchMedicines = createAsyncThunk(
//   "employee/addMedicine",
//   async(token: string, {rejectWithValue}) => {
//       try {
//           const response = await axios.get('http://localhost:8000/api/product/medicine/', {
//               headers: {
//                   'accept': 'application/json',
//                   "Content-Type": 'application/json',
//                   'Authorization': `Bearer ${token}`
//               }
//           })

//           return response.data
//       } catch (error: any){
//           return rejectWithValue(error.response?.data || error.message)
//       }
//   }
// )


const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    // connect(state) {
    //   state.connected = true;
    //   state.error = null;
    // },
    connectSocket: (state, action: PayloadAction<{ connectionKey: string; connected: boolean }>) => {
      const { connectionKey, connected } = action.payload;
      state.connections[connectionKey] = { ...state.connections[connectionKey], connected: connected };
      // if(state.connections[connectionKey]) {
      // } else {
      //   const connectionObj = { connected: connected, error: null, messages: null }
      //   state.connections = {...state.connections, [connectionKey]: connectionObj}
      // }
      // state.connections[connectionKey] = { ...state.connections[connectionKey], connected: connected, error: null, messages: [] };
    },

    // disconnect(state) {
    //   state.connected = false;
    // },
    disconnectSocket: (state, action) => {
      const { connectionKey } = action.payload;
      delete state.connections[connectionKey];
    },
    // addMessage(state, action: PayloadAction<any>) {
    //   state.messages.push(action.payload);
    // },
    addProduct: (state, action) => {
      const { connectionKey, data } = action.payload;
      if (state.connections[connectionKey]) {
        state.medicineList.push(data);
      }
    },
    // setError(state, action: PayloadAction<string>) {
    //   state.error = action.payload;
    // },
    setSocketError: (state, action) => {
      const { connectionKey, error } = action.payload;
      if (state.connections[connectionKey]) {
        // state.connections[connectionKey].error = error;
        state.connections[connectionKey] = { ...state.connections[connectionKey], error: error };
      }
    },

    setMedicineList: (state, action) => {
      const {message, data} = action.payload;
      state.message = message;
      state.medicineList = data;
      state.loading = false;
    },

    setMessage: (state, action) => {
      state.message = action.payload.message;
    },

    resetProductSliceState: (state) => {
      state.message = null;
      state.error = null;
      state.loading = false;
      state.connections = {};
      state.medicineList = [];
    },

    setError: (state, action: PayloadAction<{ apiError: any }>) => {
      state.error = action.payload.apiError;
    }, 

    setSubAction: (state, action) => {
      // console.log("subAction Payload: ", action.payload)
      state.subAction = action.payload.subAction;
    }
  },

//   extraReducers: (builder) => {
//     builder.addCase(fetchMedicines.pending, (state) => {
//         state.loading = true
//     });
//     builder.addCase(fetchMedicines.fulfilled, (state, action) => {
//         state.loading = false,
//         state.message = action.payload.message,
//         state.medicineList = action.payload.data
//     })
//     builder.addCase(fetchMedicines.rejected, (state, action: PayloadAction<any>) => {
//         state.error = action.payload?.detail || "Something went wrong"
//     })
// },
});

export const { connectSocket, disconnectSocket, addProduct, setSocketError, setMedicineList, setMessage, resetProductSliceState, setError, setSubAction } = websocketSlice.actions;

export default websocketSlice.reducer;
