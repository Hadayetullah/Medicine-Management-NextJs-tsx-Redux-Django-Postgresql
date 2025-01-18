import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "./serverActions";

export const connectWebSockets = createAsyncThunk(
  "websocket/connectWebSocket",
  async ({ connectionKey, url }: { connectionKey: string; url: string }, { dispatch }) => {
    try {
      const accessToken = await getAccessToken();
      dispatch({
        type: "websocket/connect",
        payload: { connectionKey, url, accessToken },
      });
    } catch (error) {
      console.error("Failed to retrieve token:", error);
    }
  }
);


export const sendWebSocketMessages = createAsyncThunk(
  "websocket/sendWebSocketMessage",
  async ({ connectionKey, message }: { connectionKey: string; message: any }, { dispatch }) =>
    dispatch({
      type: "websocket/sendMessage",
      payload: { connectionKey, message },
    })
);


export const disconnectWebSockets = createAsyncThunk(
  "websocket/disconnectWebSocket",
  async ({ connectionKey }: { connectionKey: string }, { dispatch }) => {
    dispatch({
      type: "websocket/disconnect",
      payload: { connectionKey },
    });
  }
);


export async function logout(): Promise<any> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.json();
}