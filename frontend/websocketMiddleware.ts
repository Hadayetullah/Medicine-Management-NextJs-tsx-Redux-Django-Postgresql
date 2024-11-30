import { Middleware } from "@reduxjs/toolkit";
import { connect, disconnect, addMessage, setError } from "./lib/features/websocketSlice";

let websocketInitialized = false;

export const createWebSocketMiddleware = (): Middleware => {
  let socket: WebSocket | null = null;

  return (storeAPI) => (next) => (action: any) => {
    switch (action.type) {
      case "websocket/connect": {
        const token = action.payload;

        if (websocketInitialized) {
          console.log("WebSocket connection already initialized, skipping dispatch.");
          return;
        }

        if (!token) {
          console.error("Access token not found in action payload. Cannot establish WebSocket connection.");
          return;
        }

        websocketInitialized = true;

        const url = `ws://127.0.0.1:8000/ws/product/medicine/?token=${token}`;
        socket = new WebSocket(url);

        socket.onopen = () => {
          storeAPI.dispatch(connect());
        };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            storeAPI.dispatch(addMessage(data));
          } catch (error) {
            console.error("Failed to parse WebSocket message: ", error);
          }
        };

        socket.onerror = (error) => {
          console.error("WebSocket error occurred: ", error)
          storeAPI.dispatch(setError("WebSocket error occurred"));
        };

        socket.onclose = () => {
          storeAPI.dispatch(disconnect());
        };
        break;
      }

      case "websocket/disconnect": {
        if (socket) {
          socket.close();
        }
        socket = null;
        storeAPI.dispatch(disconnect());
        break;
      }

      case "websocket/sendMessage": {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(action.payload));
        }
        break;
      }

      default:
        break;
    }

    return next(action);
  };
};
