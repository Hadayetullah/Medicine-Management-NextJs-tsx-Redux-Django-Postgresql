import { setMedicineList } from "@/lib/features/productSlice";
import { connectWebSockets } from "./apiActions";

import { connectionDetailsType, MedicineType, WebSocketState } from "@/lib/features/productSlice";

interface FetchMedicinesHandleSocketsProps {
    dispatch: any;
    medicineList: MedicineType[];
    connections: WebSocketState;
    connectionDetails: connectionDetailsType[];
}

export async function FetchMedicinesHandleSockets({
    dispatch,
    medicineList,
    connections,
    connectionDetails,
  }: FetchMedicinesHandleSocketsProps): Promise<boolean> {
    const authResponse = await fetch("/api/auth/check-refresh-token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const authResponseResult = await authResponse.json();
    if (authResponseResult.success) {
        if (medicineList.length < 1) {
            const res = await fetch("/api/product/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            });

            const result = await res.json();
            if (result.success) {
            dispatch(setMedicineList(result.data));
            
            } else {
            
            console.error("Error getting medicine list:", result.error);
            }
        }

    

        const connectionKeys = Object.keys(connections);

        if (
            connectionKeys &&
            connectionKeys.length > 0 &&
            connectionKeys.length === connectionDetails.length
        ) {
            connectionDetails.forEach((connection:any) => {
            const connectionName = connection.connectionKey;
            if (connectionKeys.includes(connectionName)) {
                const connectionInfo = connections[connectionName];
                if (connectionInfo && connectionInfo.connected === false) {
                dispatch(
                    connectWebSockets({
                    connectionKey: `${connectionName}`,
                    url: `ws://localhost:8000/ws/${connection.connectionUrl}/`,
                    })
                );
                }
            }
            });
        }

        if (connectionKeys && connectionKeys.length < 1) {
            connectionDetails.forEach((connection:any) => {
            const connectionName = connection.connectionKey;
            dispatch(
                connectWebSockets({
                connectionKey: `${connectionName}`,
                url: `ws://localhost:8000/ws/${connection.connectionUrl}/`,
                })
            );
            });
        }

    } else {
    console.error("authResponseResult error:", authResponseResult.error);
    }

    return false;
};
