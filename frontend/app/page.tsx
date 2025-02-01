"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMedicineList } from "@/lib/features/productSlice";
import { connectWebSockets } from "@/app/actions/apiActions";
import { FetchMedicinesHandleSockets } from "@/app/actions/clientActions";
import Loader from "./components/client/Loader";

export default function HomePage() {
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

  useEffect(() => {
    // getMedicineList();
    const handleFetchMedicinesHandleSockets = async () => {
      if (medicineList === undefined || medicineList.length < 1) {
        setLoading(true);
        const medicineListLength = medicineList.length;
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

  if (productLoading || loading) {
    return <Loader />;
  }
  return (
    <div className="max-w-[1400px] mx-auto mt-[70px]">
      <h1 className="text-2xl">
        This Home page is under development. Please visit other pages
      </h1>
    </div>
  );
}
