import { setMedicineList, setError } from "@/lib/features/productSlice";
import { connectWebSockets } from "./apiActions";

import { connectionDetailsType, MedicineType, WebSocketState } from "@/lib/features/productSlice";
import { getWSurl } from "./serverActions";
import apiService from "./apiService";

interface FetchMedicinesHandleSocketsProps {
    dispatch: any;
    medicineListLength: number;
    connections: WebSocketState;
    connectionDetails: connectionDetailsType[];
}

export async function FetchMedicinesHandleSockets({
    dispatch,
    medicineListLength,
    connections,
    connectionDetails,
  }: FetchMedicinesHandleSocketsProps): Promise<boolean> {

    const wsurl = await getWSurl();
    
    if (medicineListLength < 1) {
        const response = await apiService.get("/api/product/medicine/");
    
        if (response.data) {
            console.log("Clientaction response : ", response)
            dispatch(setMedicineList({msg: response.message, data: response.data}));
    
        } else {
            const tmpErrors: string[] = Object.values(response).map((error: any) => {
            return error;
            });

            console.error("Error getting medicine list:", tmpErrors);
    
            dispatch(setError({apiError: tmpErrors}))
        }
    }



    
        // if (medicineListLength < 1) {
        //     const res = await fetch("/api/product/", {
        //     method: "GET",
        //     headers: { "Content-Type": "application/json" },
        //     });

        //     const result = await res.json();
        //     if (result.success) {
        //         dispatch(setMedicineList(result.data));
            
        //     } else {
            
        //     console.error("Error getting medicine list:", result.error);
        //     }
        // }

    

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
                            url: `${wsurl}/${connection.connectionUrl}/`,
                            })
                        );
                    }
                }
            });
        }

        else if (connectionKeys && connectionKeys.length < 1) {
            connectionDetails.forEach((connection:any) => {
                const connectionName = connection.connectionKey;
                dispatch(
                    connectWebSockets({
                    connectionKey: `${connectionName}`,
                    url: `${wsurl}/${connection.connectionUrl}/`,
                    })
                );
            });
        }


    return false;
};
