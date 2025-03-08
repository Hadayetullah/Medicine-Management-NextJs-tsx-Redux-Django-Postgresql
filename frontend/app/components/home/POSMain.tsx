"use client";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMedicineList } from "@/lib/features/productSlice";
import { connectWebSockets } from "@/app/actions/apiActions";
import { FetchMedicinesHandleSockets } from "@/app/actions/clientActions";
import Loader from "../client/Loader";
import Sidebar from "./Sidebar";
import CustomerSection from "./CustomerSection";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const POSMain = () => {
  const dispatch = useAppDispatch();

  const {
    connectionDetails,
    loading: productLoading,
    message,
    error: productError,
    connections,
    medicineList,
  } = useAppSelector((state) => state.product);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // getMedicineList();
    const handleFetchMedicinesHandleSockets = async () => {
      // const isRefreshToken = await isRefreshTokenValid();
      // if (isRefreshToken) {
      if (medicineList === undefined || medicineList.length < 1) {
        // setLoading(true);
        const medicineListLength = medicineList?.length
          ? medicineList.length
          : 0;
        const isLoading = await FetchMedicinesHandleSockets({
          dispatch,
          medicineListLength,
          connections,
          connectionDetails,
        });
        setLoading(isLoading); // Update the state with the returned value
      } else {
        setLoading(false);
      }
      // } else {
      //   router.push("/login");
      // }
    };

    handleFetchMedicinesHandleSockets();
  }, []);

  if (productLoading || loading) {
    return <Loader />;
  }

  return (
    <div>
      <Sidebar />
      <div className="w-full pl-[58px] pt-[55px] flex flex-row justify-between fixed top-[0] left-[0px] h-full">
        <div className="w-[50%]">
          <LeftSection />
        </div>

        <div className="w-[50%]">
          <RightSection medicineList={medicineList} />
        </div>
      </div>
    </div>
  );
};

export default POSMain;
