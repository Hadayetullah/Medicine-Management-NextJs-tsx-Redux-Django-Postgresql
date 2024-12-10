"use client";

// import { getTokensFromCookies, validateAccessTokenLife } from "@/actions";
// import { authCheck } from "@/app/utils/authCheckUtil";
// import { dispatchFetchMedicines } from "@/app/utils/fetchMedicinesUtil";
// import { restoreAuthState } from "@/lib/features/authSlice";
// import { RootState, useAppDispatch } from "@/lib/store";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { RootState } from "@/lib/store";

const DataTable = () => {
  // const dispatch = useAppDispatch();
  // const router = useRouter();

  // const {
  //   loading: authLoading,
  //   error: authError,
  //   isAuthenticated,
  //   accessToken,
  //   refreshToken,
  // } = useSelector((state: RootState) => state.auth);

  // const {
  //   loading: websocketLoading,
  //   message,
  //   error: websocketError,
  //   connections,
  //   medicineList,
  // } = useSelector((state: RootState) => state.websocket);

  // const fetchMedicines = async () => {
  //   const validatedTokens: boolean = await validateAccessTokenLife(accessToken);

  //   if (!validatedTokens) {
  //     router.push("/login");
  //   } else {
  //     dispatchFetchMedicines(dispatch, accessToken);
  //   }
  // };

  const [loading, setLoading] = useState(true);

  // const handleLoading = async () => {
  //   console.log("HandleLoading called");
  //   if (authLoading || websocketLoading || !accessToken) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // };

  // const auth = async (access: string | null, refresh: string | null) => {
  //   const isTokenValid = await validateAccessTokenLife(access);

  //   console.log("isTokenValid: ", isTokenValid);

  //   if (!isTokenValid) {
  //     router.push("/login");
  //     dispatch(
  //       restoreAuthState({
  //         accessToken: access,
  //         refreshToken: refresh,
  //         isAuthenticated: false,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       restoreAuthState({
  //         accessToken: access,
  //         refreshToken: refresh,
  //         isAuthenticated: true,
  //       })
  //     );
  //   }
  // };

  // const handleAuthCheck = async () => {
  //   console.log("handleAuthCheck called");
  //   const tokens: any = await getTokensFromCookies();

  //   if (tokens && tokens.accessToken) {
  //     auth(tokens.accessToken, tokens.refreshToken);
  //   } else {
  //     // console.log("Forth: ", tokens.accessToken);
  //     auth(null, null);
  //   }
  // };

  // console.log("accessToken Outside useEffect: ", accessToken);
  // console.log("IsAuthenticated Outside useEffect: ", isAuthenticated);

  useEffect(() => {
    console.log(
      "This does not print in the browser console until i reload the page again."
    );
    // handleLoading();
    // handleAuthCheck();

    // console.log("Outside Lenght: ", medicineList.length);
    // if (medicineList.length === 0) {
    //   console.log("Inside Lenght: ", medicineList.length);
    //   if (accessToken) {
    //     dispatchFetchMedicines(dispatch, accessToken);
    //   }
    // }
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div className="w-full mb-5">
      {/* <div
        className="overflow-x-auto overflow-y-hidden w-full h-full"
        style={{ scrollbarWidth: "thin", zIndex: "-1" }}
      >
        <div className="min-w-[900px] max-w-full">
          <div className="h-[40px] w-full bg-gray-100 font-bold text-xs md:text-sm text-gray-500 flex flex-row pl-1 sm:pl-2.5 pr-4">
            <div className="w-[15%] h-full flex items-center pl-2">
              <h4>Name</h4>
            </div>

            <div className="w-[15%] h-full flex items-center pl-1">
              <h4>Company</h4>
            </div>

            <div className="w-[14%] h-full flex items-center pl-1">
              <h4>Brand/Category</h4>
            </div>

            <div className="w-[14%] h-full flex items-center pl-1">
              <h4>Dosage Form</h4>
            </div>

            <div className="w-[12%] h-full flex items-center justify-center pl-1">
              <h4>Power/Strenght</h4>
            </div>

            <div className="w-[7%] h-full flex items-center justify-center pl-1">
              <h4>Price</h4>
            </div>

            <div className="w-[10%] h-full flex items-center pl-1">
              <h4>Available</h4>
            </div>

            <div className="w-[13%] h-full flex items-center justify-center pl-1">
              <h4>View Detail</h4>
            </div>
          </div>

          <div
            className="overflow-y-scroll overflow-x-hidden text-sm md:text-base w-full h-full bg-gray-100 pl-1 sm:pl-2.5"
            style={{ scrollbarWidth: "thin", zIndex: "-1" }}
          >
            <div className="w-full min-h-[60vh] max-h-[75vh] pb-5 bg-white">
              {medicineList.length > 0 ? (
                <div className="w-full h-full">
                  {medicineList.map((medicine, index) => {
                    return (
                      <div
                        className={`w-full h-full flex flex-row text-gray-500 ${
                          index % 2 === 1 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <div className="w-[15%] h-full flex my-1 items-center pl-2">
                          <h4>{"medicine name"}</h4>
                        </div>

                        <div className="w-[15%] h-full flex my-1 items-center pl-1">
                          <h4>{"company name"}</h4>
                        </div>

                        <div className="w-[14%] h-full flex my-1 items-center pl-1">
                          <h4>{"category name"}</h4>
                        </div>

                        <div className="w-[14%] h-full flex my-1 items-center pl-1">
                          <h4>{"dosage form"}</h4>
                        </div>

                        <div className="w-[12%] h-full flex my-1 items-center justify-center pl-1">
                          <h4>{"medicine power"}</h4>
                        </div>

                        <div className="w-[7%] h-full flex my-1 pl-1 justify-center">
                          <h4>{"medicine price"}</h4>
                        </div>

                        <div className="w-[10%] h-full flex my-1 flex-col pl-1">
                          <h4>{"Available"}</h4>
                        </div>

                        <div className="w-[13%] h-full flex my-1 flex-col pl-1 items-center gap-[3px]">
                          <button
                            className="w-full text-gray-900 bg-green-500 mr-1 rounded-md hover:bg-green-600"
                            // onClick={() => handleEditForm(medicine)}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full text-white bg-red-600 mr-1 rounded-md hover:bg-red-700"
                            // onClick={() => handleDelete(medicine.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-[200px]">
                  <h4 className="text-lg text-gray-500 font-semibold">
                    No data available
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}
      Hello
    </div>
  );
};

export default DataTable;
