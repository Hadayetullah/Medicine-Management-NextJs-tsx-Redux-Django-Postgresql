
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SinglePrescriptionType } from "./prescriptionsSlice";

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
    quantity: number;
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
    {
      connectionKey: "prescriptionConnection",
      connectionUrl: "customer/prescriptions",
    },
  ],
  subAction: "",
  message: null,
  error: null,
  loading: false,
  connections: {},
  medicineList: [],
};


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

    setMedicineList: (state, action: PayloadAction<{msg: string|null, data: MedicineType[]}>) => {
      const {msg, data} = action.payload;
      // state.message = msg;
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
    },

    updateMedicine: (state, action: PayloadAction<{ data: MedicineType, message: string }>) => {
      const index = state.medicineList.findIndex(medicine => medicine.id === action.payload.data.id);
      
      if (index !== -1) {
        state.medicineList[index] = action.payload.data; // Directly mutating inside Immer
        state.message = action.payload.message
      }
    },

    decreaseMedicineListQuantity: (state, action: PayloadAction<any>) => {
      state.medicineList[action.payload].quantity -= 1;
    },

    IncreaseMedicineListQuantity: (state, action: PayloadAction<any>) => {
        state.medicineList[action.payload].quantity += 1;
    },

    restoreMedicineListQuantity: (state, action: PayloadAction<any>) => {
      const obj = state.medicineList[action.payload.medicineListIndex];
      state.medicineList[action.payload.medicineListIndex] = {...obj, quantity: obj.quantity + action.payload.tmpQuantity }
    },

    updateQuantityOnSell: (state, action: PayloadAction<{ customer_prescriptions: SinglePrescriptionType[] }>) => {
      action.payload.customer_prescriptions.forEach((medicine: SinglePrescriptionType) => {
        const index = state.medicineList.findIndex(med => med.id === medicine.medicine_details.id);

        if (index !== -1) {
          state.medicineList[index].quantity = medicine.medicine_details.quantity; // Directly mutating inside Immer
        }
      })
    },
    
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

export const { 
  connectSocket, 
  disconnectSocket, 
  addProduct, 
  setSocketError, 
  setMedicineList, 
  setMessage, 
  resetProductSliceState, 
  setError, 
  setSubAction, 
  updateMedicine, 
  decreaseMedicineListQuantity, 
  IncreaseMedicineListQuantity, 
  restoreMedicineListQuantity,
  updateQuantityOnSell,
} = websocketSlice.actions;

export default websocketSlice.reducer;
