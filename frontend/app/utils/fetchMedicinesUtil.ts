import { fetchMedicines } from "@/lib/features/productSlice";

export const dispatchFetchMedicines = async(dispatch: Function, token: string|null) => {
  if (!token) {
    console.error("Access token is missing. Cannot dispatch.");
    return;
  }

  dispatch(fetchMedicines(token));
};
