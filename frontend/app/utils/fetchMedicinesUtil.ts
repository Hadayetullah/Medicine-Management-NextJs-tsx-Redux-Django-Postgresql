import { fetchMedicines } from "@/lib/features/websocketSlice";

export const dispatchFetchMedicines = async(dispatch: Function, token: string|null) => {
  if (!token) {
    console.error("Access token is missing. Cannot dispatch.");
    return;
  }

  dispatch(fetchMedicines(token));
};
