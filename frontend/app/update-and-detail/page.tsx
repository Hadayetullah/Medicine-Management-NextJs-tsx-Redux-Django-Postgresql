"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { MedicineType, setMedicineList } from "@/lib/features/productSlice";
import { connectWebSockets } from "@/app/actions/apiActions";
import { FetchMedicinesHandleSockets } from "@/app/actions/clientActions";
import Loader from "../components/client/Loader";
import SearchMedicine from "../components/common/SearchMedicine";
import Update from "../components/updateAndDetail/Update";
import DisplayAllMedicines from "../components/updateAndDetail/DisplayAllMedicines";
import DisplaySearchedMedicines from "../components/updateAndDetail/DisplaySearchedMedicines";

// import { connectWebSocket } from "@/app/utils/websocketMiddlewareUtil";

export default function UpdateAndDetailPage() {
  // const connectionDetails = [
  //   {
  //     connectionKey: "medicineConnection",
  //     connectionUrl: "product/medicine",
  //   },
  // ];

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    connectionDetails,
    loading: productLoading,
    message,
    error: productError,
    connections,
    medicineList,
  } = useAppSelector((state) => state.product);

  const [loading, setLoading] = useState<boolean>(false);
  const [updateDetailModal, setUpdateDetailModal] = useState<boolean>(false);

  const [errorFetchingProduct, setErrorFetchingProduct] = useState<any>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  // const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleUpdateDetail = (data: any, modalStatus: boolean) => {
    setSelectedMedicine(data);
    setUpdateDetailModal(modalStatus);
  };

  // const getMedicineList = async () => {
  //   setLoading(true);
  //   const authResponse = await fetch("/api/auth/check-refresh-token/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   const authResponseResult = await authResponse.json();
  //   if (authResponseResult.success) {
  //     if (medicineList.length < 1) {
  //       const res = await fetch("/api/product/", {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       const result = await res.json();
  //       if (result.success) {
  //         dispatch(setMedicineList(result.data));
  //         setLoading(false);
  //         // await connectWebSocket("medicineConnection");
  //       }

  //       if (!result.success) {
  //         setLoading(false);
  //         console.log(result.error);
  //         console.error("Error getting medicine list");
  //       }
  //     }

  //     setLoading(false);

  //     const connectionKeys = Object.keys(connections);

  //     if (
  //       connectionKeys &&
  //       connectionKeys.length > 0 &&
  //       connectionKeys.length === connectionDetails.length
  //     ) {
  //       connectionDetails.forEach((connection) => {
  //         const connectionName = connection.connectionKey;
  //         if (connectionKeys.includes(connectionName)) {
  //           const connectionInfo = connections[connectionName];
  //           if (connectionInfo && connectionInfo.connected === false) {
  //             dispatch(
  //               connectWebSockets({
  //                 connectionKey: `${connectionName}`,
  //                 url: `ws://localhost:8000/ws/${connection.connectionUrl}/`,
  //               })
  //             );
  //           }
  //         }
  //       });
  //     }

  //     if (connectionKeys && connectionKeys.length < 1) {
  //       connectionDetails.forEach((connection) => {
  //         const connectionName = connection.connectionKey;
  //         dispatch(
  //           connectWebSockets({
  //             connectionKey: `${connectionName}`,
  //             url: `ws://localhost:8000/ws/${connection.connectionUrl}/`,
  //           })
  //         );
  //       });
  //     }
  //   } else {
  //     setLoading(false);
  //     console.log("authResponseResult error : ", authResponseResult.error);
  //   }
  // };

  useEffect(() => {
    // getMedicineList();

    const handleFetchMedicinesHandleSockets = async () => {
      if (medicineList === undefined || medicineList.length < 1) {
        setLoading(true);
        const medicineListLength = medicineList.length;
        const connectionKeys = Object.keys(connections);
        const isLoading = await FetchMedicinesHandleSockets({
          dispatch,
          medicineListLength,
          connections,
          connectionDetails,
        });
        setLoading(isLoading); // Update the state with the returned value
      }
    };

    handleFetchMedicinesHandleSockets();
  }, []);

  // useEffect(() => {
  //   const handler = setTimeout(() => setDebouncedQuery(searchQuery), 200);
  //   return () => clearTimeout(handler);
  // }, [searchQuery]);

  const filteredMedicines = useMemo(() => {
    if (medicineList && medicineList.length > 0) {
      return medicineList.filter((medicine: MedicineType) =>
        medicine.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return [];
    }
  }, [medicineList, searchQuery]);

  // Display Loader
  if (productLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1450px] mx-auto">
      <SearchMedicine
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="w-full mt-10 mb-5">
        <div
          className="overflow-x-auto overflow-y-hidden w-full h-full"
          style={{ scrollbarWidth: "thin", zIndex: "-1" }}
        >
          <div className="min-w-[1100px] max-w-full">
            <div className="h-[40px] w-full bg-gray-100 font-bold text-xs md:text-sm text-gray-500 flex flex-row pl-1 sm:pl-2.5 pr-4">
              <div className="w-[14%] h-full flex items-center pl-2">
                <h4>Name</h4>
              </div>

              <div className="w-[14%] h-full flex items-center pl-1">
                <h4>Company</h4>
              </div>

              <div className="w-[13%] h-full flex items-center pl-1">
                <h4>Brand/Category</h4>
              </div>

              <div className="w-[13%] h-full flex items-center pl-1">
                <h4>Dosage Form</h4>
              </div>

              <div className="w-[8%] h-full flex items-center justify-center pl-1">
                <h4>Shelf No.</h4>
              </div>

              <div className="w-[11%] h-full flex items-center justify-center pl-1">
                <h4>Power/Strenght</h4>
              </div>

              <div className="w-[7%] h-full flex items-center justify-center pl-1">
                <h4>Price</h4>
              </div>

              <div className="w-[8%] h-full flex items-center pl-1">
                <h4>Quantity</h4>
              </div>

              <div className="w-[12%] h-full flex items-center justify-center pl-1">
                <h4>Update/Detail</h4>
              </div>
            </div>

            <div
              className="overflow-y-scroll overflow-x-hidden text-sm md:text-base w-full h-full bg-gray-100 pl-1 sm:pl-2.5"
              style={{ scrollbarWidth: "thin", zIndex: "-1" }}
            >
              <div className="w-full min-h-[60vh] max-h-[75vh] pb-5 bg-white">
                {medicineList.length > 0 ? (
                  <div className="w-full h-full">
                    {filteredMedicines.length > 0 ? (
                      <DisplaySearchedMedicines
                        filteredMedicines={filteredMedicines}
                        handleUpdateDetail={handleUpdateDetail}
                      />
                    ) : (
                      <DisplayAllMedicines
                        medicineList={medicineList}
                        handleUpdateDetail={handleUpdateDetail}
                      />
                    )}
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

      {updateDetailModal && (
        <Update
          selectedMedicine={selectedMedicine}
          setUpdateDetailModal={setUpdateDetailModal}
        />
      )}
    </div>
  );
}
