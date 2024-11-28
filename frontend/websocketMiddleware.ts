import { Middleware } from "@reduxjs/toolkit";
import { connect, disconnect, addMessage, setError } from "./lib/features/websocketSlice";

interface WebSocketAction {
  type: string;
  payload?: any;
}

export const createWebSocketMiddleware = (url: string): Middleware => {
  let socket: WebSocket | null = null;

  return (storeAPI) => (next) => (action: WebSocketAction) => {
    switch (action.type) {
      case "websocket/connect": {
        socket = new WebSocket(url);

        socket.onopen = () => {
          storeAPI.dispatch(connect());
        };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            storeAPI.dispatch(addMessage(data));
          } catch (error) {
            console.error("Failed to parse WebSocket message", error);
          }
        };

        socket.onerror = (error) => {
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
