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
  setPrescriptionsSliceMsg,
} from "@/lib/features/prescriptionsSlice";
import PrescriptionSuccessMsg from "../modals/PrescriptionSuccessMsg";
import HoldedList from "./holdedList/HoldedList";

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

  const { customersPrescriptionList, prescriptionsSliceMsg } = useAppSelector(
    (state) => state.prescriptions
  );

  const { tmpHoldedCustomers } = useAppSelector((state) => state.customer);

  // console.log("prescriptionsSliceMsg : ", prescriptionsSliceMsg);

  const [loading, setLoading] = useState<boolean>(true);
  const [prescriptionListModal, setCustomerListModal] =
    useState<boolean>(false);

  const [holdedListModal, setHoldedListModal] = useState<boolean>(false);

  const [msgModal, setMsgModal] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (prescriptionsSliceMsg && prescriptionsSliceMsg != undefined) {
      setMsgModal(true);
      timeoutId = setTimeout(() => {
        setMsgModal(false);
        dispatch(setPrescriptionsSliceMsg({ message: "" }));
      }, 1000);
    }

    // Cleanup function to clear the timeout
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [prescriptionsSliceMsg]);

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
      <Sidebar
        setHoldedListModal={setHoldedListModal}
        setCustomerListModal={setCustomerListModal}
      />
      <div className="w-full pl-[58px] pt-[55px] flex flex-row justify-between fixed top-[0] left-[0px] h-full">
        <div className="relative w-[50%]">
          <PrescriptionSuccessMsg
            prescriptionsSliceMsg={prescriptionsSliceMsg}
            setMsgModal={setMsgModal}
            msgModal={msgModal}
          />

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

      {holdedListModal && (
        <HoldedList
          setHoldedListModal={setHoldedListModal}
          tmpHoldedCustomers={tmpHoldedCustomers}
        />
      )}
    </div>
  );
};

export default POSMain;
