import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebSocketState {
  connected: boolean;
  messages: any[]; // Use specific types for the message payloads (For later)
  error: string | null;
}

const initialState: WebSocketState = {
  connected: false,
  messages: [],
  error: null,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    connect(state) {
      state.connected = true;
      state.error = null;
    },
    disconnect(state) {
      state.connected = false;
    },
    addMessage(state, action: PayloadAction<any>) {
      state.messages.push(action.payload);
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { connect, disconnect, addMessage, setError } = websocketSlice.actions;

export default websocketSlice.reducer;
