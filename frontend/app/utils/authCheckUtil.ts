import { validateAccessTokenLife } from "@/actions";
import { restoreAuthState } from "@/lib/features/authSlice";
import { dispatchFetchMedicines } from "./fetchMedicinesUtil";

let isAuthChecked = false;

export const authCheck = (dispatch: Function, push: Function, accessToken:string|null) => {

  if (isAuthChecked) {
    console.log("Authentication is checked already.");
    return;
  }

  isAuthChecked = true

  const isTokenValid = validateAccessTokenLife(accessToken);

  if (!isTokenValid) {
    push("/login");
    dispatch(
      restoreAuthState({
        payload: {
          isAuthenticated: false,
        },
      })
    );
  } else {
    dispatch(
      restoreAuthState({
        payload: {
          isAuthenticated: true,
        },
      })
    );
  }
};