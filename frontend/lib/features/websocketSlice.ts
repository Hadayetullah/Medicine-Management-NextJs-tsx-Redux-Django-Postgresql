import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface MedicineType {
  medicine: {
    id: string;
    name: string;
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

interface WebSocketState {
  [connectionKey: string]: {
    connected: boolean;
    error?: string;
    messages: any[];
  };
}

interface MainStateType {
  loading: boolean;
  connections: WebSocketState;
  medicineList: MedicineType[];
}

const initialState: MainStateType = {
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
    connect: (state, action) => {
      const { connectionKey } = action.payload;
      state.connections[connectionKey] = { connected: true, messages: [] };
    },
    // disconnect(state) {
    //   state.connected = false;
    // },
    disconnect: (state, action) => {
      const { connectionKey } = action.payload;
      delete state.connections[connectionKey];
    },
    // addMessage(state, action: PayloadAction<any>) {
    //   state.messages.push(action.payload);
    // },
    addMessage: (state, action) => {
      const { connectionKey, data } = action.payload;
      if (state.connections[connectionKey]) {
        state.connections[connectionKey].messages.push(data);
      }
    },
    // setError(state, action: PayloadAction<string>) {
    //   state.error = action.payload;
    // },
    setError: (state, action) => {
      const { connectionKey, error } = action.payload;
      if (state.connections[connectionKey]) {
        state.connections[connectionKey].error = error;
      }
    },
  },
});

export const { connect, disconnect, addMessage, setError } = websocketSlice.actions;

export default websocketSlice.reducer;
