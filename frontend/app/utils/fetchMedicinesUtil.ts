import { fetchMedicines } from "@/lib/features/websocketSlice";

let IsInitialized = false;

export const dispatchFetchMedicines = (dispatch: Function, token: string) => {
  if (!token) {
    console.error("Access token is missing. Cannot dispatch websocket/connect.");
    return;
  }

  if (IsInitialized) {
    console.log("Api call already initialized, skipping dispatch.");
    return;
  }

  IsInitialized = true;
  dispatch(fetchMedicines(token));
};
