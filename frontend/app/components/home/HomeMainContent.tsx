"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMedicineList } from "@/lib/features/productSlice";
import Loader from "../client/Loader";
import Search from "./SearchMedicine";
import { connectWebSocket } from "@/app/actions/apiActions";

// import { connectWebSocket } from "@/app/utils/websocketMiddlewareUtil";

const HomeMainContent = () => {
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
  const eventSourceRef = React.useRef<EventSource | null>(null);
  const getMedicineListRef = React.useRef<boolean>();

  console.log("Socket MSG : ", message);

  const getMedicineList = async () => {
    const res = await fetch("/api/product/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.success) {
      dispatch(setMedicineList(result.data));
      setLoading(false);
      // await connectWebSocket("medicineConnection");
      dispatch(
        connectWebSocket({
          connectionKey: "medicineConnection",
          url: "ws://localhost:8000/ws/product/medicine/",
        })
      );
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
    } else {
      setLoading(false);
    }
  }, []);

  if (productLoading || loading) {
    return <Loader />;
  }

  return (
    <>
      <Search />
      <div className="w-full mt-10 mb-5">
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
                    {medicineList.map((medicine: any, index: number) => {
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
    </>
  );
};

export default HomeMainContent;
