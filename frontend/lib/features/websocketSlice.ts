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

interface WebSocketState {
  connections: {
    [connectionKey: string]: {
      connected: boolean;
      error?: string;
      messages: any[];
    };
  };
}

const initialState: WebSocketState = {
  connections: {},
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
