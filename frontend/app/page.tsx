// // import Loader from "@/components/Loader";
// // import { dispatchFetchMedicines } from "./utils/fetchMedicinesUtil";
// // import { MedicineType } from "@/lib/features/websocketSlice";
// // import { authCheck } from "./utils/authCheckUtil";
// export const dynamic = "force-dynamic";

// import { authServerSideProps } from "../server/authServerSideProps";
// export { authServerSideProps as getServerSideProps };

// import { headers } from "next/headers";
// // import validateToken from "./utils/validateToken";
// import { redirect } from "next/navigation";

// export default function Home({
//   accessToken,
//   refreshToken,
// }: {
//   accessToken: string | null;
//   refreshToken: string | null;
// }) {
//   // if (!accessToken) {
//   //   return null;
//   // }
//   // const [currentTitle, setCurrentTitle] = useState<string>("");
//   // const [medicineData, setMedicineData] = useState();

//   // const handleActiveTitleAndData = (title: string) => {
//   //   setCurrentTitle(title);
//   // };

//   // const hasRunEffect = useRef(false);

//   // console.log("isAuthenticated: ", isAuthenticated);

//   // useEffect(() => {
//   //   if (isAuthenticated && accessToken && !hasRunEffect.current) {
//   //     hasRunEffect.current = true;

//   //     dispatchFetchMedicines(dispatch, accessToken);

//   //     // Dispatch WebSocket connection for medicine
//   //     dispatch({
//   //       type: "websocket/connect",
//   //       payload: {
//   //         connectionKey: "medicineConnection",
//   //         token: accessToken,
//   //         url: "ws://127.0.0.1:8000/ws/product/medicine/",
//   //       },
//   //     });

//   //     // Dispatch WebSocket connection for notification
//   //     // dispatch({
//   //     //   type: "websocket/connect",
//   //     //   payload: {
//   //     //     connectionKey: "notificationConnection",
//   //     //     token: accessToken,
//   //     //     url: "ws://127.0.0.1:8000/ws/product/notification/",
//   //     //   },
//   //     // });
//   //   }
//   // }, [isAuthenticated, accessToken, dispatch]);

//   // useEffect(() => {
//   //   console.log("Auth");
//   //   if (accessToken && accessToken !== null && accessToken !== "undefined") {
//   //     authCheck(dispatch, router.push, accessToken);
//   //   } else {
//   //     router.push("/login");
//   //     dispatch(
//   //       restoreAuthState({
//   //         isAuthenticated: false,
//   //       })
//   //     );
//   //   }

//   //   if (
//   //     accessToken &&
//   //     accessToken !== null &&
//   //     accessToken !== "undefined" &&
//   //     !hasRunEffect.current
//   //   ) {
//   //     hasRunEffect.current = true;

//   //     console.log("Data");

//   //     dispatchFetchMedicines(dispatch, accessToken);

//   //     // Dispatch WebSocket connection for medicine
//   //     dispatch({
//   //       type: "websocket/connect",
//   //       payload: {
//   //         connectionKey: "medicineConnection",
//   //         token: accessToken,
//   //         url: "ws://127.0.0.1:8000/ws/product/medicine/",
//   //       },
//   //     });
//   //   }
//   // }, [authLoading, isAuthenticated, dispatch, router]);

//   // return (
//   //   <>
//   //     {/* <div className="min-w-[190px] max-w-[300px] flex flex-row items-center justify-center gap-3 mt-[70px] mb-2 mx-auto">
//   //           <button
//   //             onClick={() => handleActiveTitleAndData("all")}
//   //             className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
//   //               currentTitle === "all" ? "bg-blue-900" : "bg-blue-500"
//   //             }`}
//   //           >
//   //             All
//   //           </button>

//   //           <button
//   //             onClick={() => handleActiveTitleAndData("searched")}
//   //             className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
//   //               currentTitle === "searched" ? "bg-blue-900" : "bg-blue-500"
//   //             }`}
//   //           >
//   //             Searched
//   //           </button>
//   //         </div> */}
//   //     <DataTable />
//   //   </>
//   // );

//   if (accessToken) {
//     return <div>Hello</div>;
//   }
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMedicineList } from "@/lib/features/productSlice";

import Loader from "./components/client/Loader";
import { handleWebSocket } from "./actions/clientActions";

export default async function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    loading: productLoading,
    message,
    error: productError,
    connections,
    medicineList,
  } = useAppSelector((state) => state.product);

  const [loading, setLoading] = useState<boolean>(true);
  const getMedicineListRef = React.useRef<boolean>();

  const getMedicineList = async () => {
    const res = await fetch("/api/product/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.success) {
      dispatch(setMedicineList(result.data));
      setLoading(false);
      const connect = await handleWebSocket("connect", {
        connectionKey: "medicineConnection",
        message: null,
      });

      if (connect.success) {
        console.log("WebSocket connection established");
      } else {
        console.error("Failed to establish WebSocket connection");
      }
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

  if (productLoading || loading) {
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
}
