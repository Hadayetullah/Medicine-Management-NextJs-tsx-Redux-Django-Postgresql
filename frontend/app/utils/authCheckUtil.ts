import { validateAccessTokenLife } from "@/lib/actions";
import { restoreAuthState } from "@/lib/features/authSlice";
import { dispatchFetchMedicines } from "./fetchMedicinesUtil";

// let isAuthChecked = false;

export const authCheck = async(dispatch: Function, push: Function, accessToken:string|null, refreshToken: string|null) => {

  const isTokenValid = await validateAccessTokenLife(accessToken);

  if (!isTokenValid) {
    push("/login");
    dispatch(
      restoreAuthState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAuthenticated: false,
      })
    );
  } else {
    dispatch(
      restoreAuthState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        isAuthenticated: true,
      })
    );
  }
};