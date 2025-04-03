import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  decreaseTmpMedicineQuantity,
  IncreaseTmpMedicineQuantity,
  removeTmpMedicine,
} from "@/lib/features/customerSlice";

import {
  decreaseMedicineListQuantity,
  IncreaseMedicineListQuantity,
  restoreMedicineListQuantity,
} from "@/lib/features/productSlice";

const Invoice = () => {
  const dispatch = useAppDispatch();

  const { tmpInvoice } = useAppSelector((state) => state.customer);

  const handleSubtractQty = (
    tmpQuantity: number,
    index: number,
    medicineListIndex: number
  ) => {
    if (tmpQuantity > 1) {
      dispatch(decreaseTmpMedicineQuantity(index));
      dispatch(IncreaseMedicineListQuantity(medicineListIndex));
    }
  };

  const handleIncreaseQty = (
    index: number,
    medicineListIndex: number,
    quantity: number
  ) => {
    if (quantity > 0) {
      dispatch(IncreaseTmpMedicineQuantity(index));
      dispatch(decreaseMedicineListQuantity(medicineListIndex));
    }
  };

  const handleDelete = (
    index: number,
    medicineListIndex: number,
    tmpQuantity: number
  ) => {
    dispatch(removeTmpMedicine(index));
    dispatch(restoreMedicineListQuantity({ medicineListIndex, tmpQuantity }));
  };

  // useEffect(() => {
  //   if (selectedMedicine) {
  //     const newMedicineObj = {
  //       name: selectedMedicine.name,
  //       company: selectedMedicine.company,
  //       category: selectedMedicine.company,
  //       dosage_form: selectedMedicine.dosage_form,
  //       power: selectedMedicine.power,
  //       price: selectedMedicine.price,
  //       quantity: 1,
  //     };

  //     setCustomerData((prevData) => ({
  //       ...prevData,
  //       medicine_data: [...prevData.medicine_data, newMedicineObj],
  //     }));
  //   }
  // }, [selectedMedicine]);

  const dolarIcon = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-[18px] h-[18px]"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"
      ></path>
    </svg>
  );

  const writeIcon = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-[18px] h-[18px]"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
      ></path>
    </svg>
  );

  const minusIcon = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-7 h-7"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
      ></path>
    </svg>
  );

  const plusIcon = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-7 h-7"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
      ></path>
    </svg>
  );

  const deleteIcon = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-6 h-6 text-[#b42a2b]"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
      ></path>
    </svg>
  );

  return (
    <div className="w-full mt-2">
      <div className="bg-[#b42a2b] w-full py-1 flex flex-row items-center text-white uppercase font-semibold text-sm">
        <div className="w-[33%] text-center">
          <h4>Medicines</h4>
        </div>

        <div className="w-[10%]">
          <h4>Power</h4>
        </div>

        <div className="w-[17%] text-center">
          <h4>Unit Price</h4>
        </div>

        <div className="w-[15%] text-center">
          <h4>Quantity</h4>
        </div>

        <div className="w-[25%] text-center">
          <h4>Total Price</h4>
        </div>
      </div>

      <div className="bg-white w-full py-2 flex flex-col text-[#5c5c5c] font-semibold text-[17px] h-[calc(100vh-455px)] overflow-y-auto">
        {tmpInvoice?.length > 0 ? (
          tmpInvoice.map((medicine: any, index: number) => {
            return (
              <div
                key={index}
                className="w-full flex flex-row items-center justify-between"
              >
                <div className="px-1">{writeIcon}</div>

                <div
                  className={`w-full flex flex-row items-center justify-between border ${
                    index + 1 === tmpInvoice?.length
                      ? "border-b-1"
                      : "border-b-0"
                  } border-gray-400 py-2`}
                >
                  <div className="w-[35%] pl-2">
                    <h5>{medicine.name}</h5>
                  </div>

                  <div className="flex flex-row items-center w-[15%]">
                    <h5>{medicine.power}mg</h5>
                  </div>

                  <div className="flex flex-row items-center w-[10%]">
                    {dolarIcon}
                    <h5>{medicine.price}</h5>
                  </div>

                  <div className="flex flex-row items-center justify-evenly w-[30%]">
                    <button
                      onClick={() =>
                        handleSubtractQty(
                          medicine.tmpQuantity,
                          index,
                          medicine.medicineListIndex
                        )
                      }
                    >
                      {minusIcon}
                    </button>
                    <h5>{medicine.tmpQuantity}</h5>
                    <button
                      onClick={() =>
                        handleIncreaseQty(
                          index,
                          medicine.medicineListIndex,
                          medicine.quantity
                        )
                      }
                    >
                      {plusIcon}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center w-[15%]">
                    {dolarIcon}
                    <h5>
                      {parseInt(medicine.tmpQuantity) *
                        parseFloat(medicine.price)}
                    </h5>
                  </div>
                </div>

                <div className="px-1 flex items-center">
                  <button
                    onClick={() =>
                      handleDelete(
                        index,
                        medicine.medicineListIndex,
                        medicine.tmpQuantity
                      )
                    }
                  >
                    {deleteIcon}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full flex flex-row items-center justify-center">
            <h4>Select Medicines</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
