"use client";

import { useRouter } from "next/navigation";
// import { getTokensFromCookies, validateAccessTokenLife } from "@/actions";
// import { authCheck } from "@/app/utils/authCheckUtil";
// import { dispatchFetchMedicines } from "@/app/utils/fetchMedicinesUtil";
// import { restoreAuthState } from "@/lib/features/authSlice";
// import { RootState, useAppDispatch } from "@/lib/store";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMedicineList } from "@/lib/features/websocketSlice";

const DataTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const {
  //   loading: authLoading,
  //   error: authError,
  //   isAuthenticated,
  //   accessToken,
  //   refreshToken,
  // } = useSelector((state: RootState) => state.auth);

  const {
    loading: websocketLoading,
    message,
    error: websocketError,
    connections,
    medicineList,
  } = useAppSelector((state) => state.websocket);

  // const fetchMedicines = async () => {
  //   const validatedTokens: boolean = await validateAccessTokenLife(accessToken);

  //   if (!validatedTokens) {
  //     router.push("/login");
  //   } else {
  //     dispatchFetchMedicines(dispatch, accessToken);
  //   }
  // };

  const [loading, setLoading] = useState<boolean>(true);
  const getMedicineListRef = React.useRef<boolean>();

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

  const getMedicineList = async () => {
    const res = await fetch("/api/product/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.success) {
      dispatch(setMedicineList(result.data));
      setLoading(false);
    } else {
      console.log(result.error);
      console.error("Error getting medicine list");
    }
  };

  useEffect(() => {
    if (medicineList.length === 0) {
      if (!getMedicineListRef.current) {
        getMedicineListRef.current = true;
        getMedicineList();
      }
    }
  }, []);

  if (websocketLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="w-full my-5">
      <div
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
                        key={index}
                        className={`w-full h-full flex flex-row text-gray-500 ${
                          index % 2 === 1 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <div className="w-[15%] h-full flex my-1 items-center pl-2">
                          <h4>{medicine.name}</h4>
                        </div>

                        <div className="w-[15%] h-full flex my-1 items-center pl-1">
                          <h4>{medicine.company?.name}</h4>
                        </div>

                        <div className="w-[14%] h-full flex my-1 items-center pl-1">
                          <h4>{medicine.category?.name}</h4>
                        </div>

                        <div className="w-[14%] h-full flex my-1 items-center pl-1">
                          <h4>{medicine.dosage_form?.name}</h4>
                        </div>

                        <div className="w-[12%] h-full flex my-1 items-center justify-center pl-1">
                          <h4>{medicine.power}</h4>
                        </div>

                        <div className="w-[7%] h-full flex my-1 pl-1 justify-center">
                          <h4>{medicine.price}</h4>
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
      </div>
    </div>
  );
};

export default DataTable;
