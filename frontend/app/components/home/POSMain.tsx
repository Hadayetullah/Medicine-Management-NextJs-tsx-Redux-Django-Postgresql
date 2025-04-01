"use client";

import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  MedicineType,
  setError,
  setMedicineList,
} from "@/lib/features/productSlice";

import { FetchMedicinesHandleSockets } from "@/app/actions/clientActions";
import Loader from "../client/Loader";
import Sidebar from "./Sidebar";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import apiService from "@/app/actions/apiService";
import PrescriptionList from "./customerList/PrescriptionList";
import {
  setCustomersPrescriptionList,
  setPrescriptionSliceError,
} from "@/lib/features/prescriptionsSlice";

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

  const { customersPrescriptionList } = useAppSelector(
    (state) => state.prescriptions
  );

  console.log("customersPrescriptionList : ", customersPrescriptionList);

  const [loading, setLoading] = useState<boolean>(true);
  const [prescriptionListModal, setCustomerListModal] =
    useState<boolean>(false);

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

      const response = await apiService.get("/api/customer/prescriptions/");

      if (response.message) {
        // console.log("Customer prescriptions response : ", response);
        dispatch(
          setCustomersPrescriptionList({
            msg: response.message,
            data: response.data,
          })
        );
      } else {
        const tmpErrors: string[] = Object.values(response).map(
          (error: any) => {
            return error;
          }
        );

        // console.error("Error getting medicine list:", tmpErrors);

        dispatch(setPrescriptionSliceError({ apiError: tmpErrors }));
        console.log("Customer prescriptions error : ", tmpErrors);
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
      <Sidebar setCustomerListModal={setCustomerListModal} />
      <div className="w-full pl-[58px] pt-[55px] flex flex-row justify-between fixed top-[0] left-[0px] h-full">
        <div className="w-[50%]">
          <LeftSection />
        </div>

        <div className="w-[50%]">
          <RightSection />
        </div>
      </div>

      {prescriptionListModal && (
        <PrescriptionList
          setPrescriptionListModal={setCustomerListModal}
          customersPrescriptionList={customersPrescriptionList}
        />
      )}
    </div>
  );
};

export default POSMain;
