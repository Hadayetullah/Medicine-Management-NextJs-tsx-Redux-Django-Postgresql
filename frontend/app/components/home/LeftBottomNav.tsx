import apiService from "@/app/actions/apiService";
import { resetTmpCustomerAndInvoice } from "@/lib/features/customerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";

const LeftBottomNav = () => {
  const dispatch = useAppDispatch();
  const { tmpInvoice, CurrentCustomer } = useAppSelector(
    (state) => state.customer
  );

  type Customer = {
    name?: string;
    age?: number;
    phone?: string;
    address?: string;
    email?: string;
    [key: string]: any; // Allows additional properties
  };

  const handlePayment = async () => {
    let invoiceObj: Customer = {
      ...CurrentCustomer,
    };

    const customer_prescription: any = [];

    tmpInvoice.forEach((medicine) => {
      // const medicineObj = {
      //   name: medicine.name,
      //   company: medicine?.company?.name,
      //   category: medicine?.category?.name,
      //   dosage_form: medicine.dosage_form?.name,
      //   price: medicine.price,
      //   power: medicine.power,
      //   quantity: medicine.tmpQuantity,
      // };

      const medicineObj = {
        medicine: medicine.id,
        sold_quantity: medicine.tmpQuantity,
      };

      customer_prescription.push(medicineObj);
    });

    invoiceObj = {
      ...invoiceObj,
      customer_prescriptions: customer_prescription,
    };

    // dispatch(resetTmpCustomerAndInvoice());

    console.log("invoiceObj : ", invoiceObj);
    // const response = await apiService.post(
    //   "/api/customer/prescriptions/",
    //   JSON.stringify(invoiceObj)
    // );

    // age: 10,

    const getresponse = await apiService.get("/api/customer/prescriptions/6/");
    console.log("getresponse : ", getresponse);
    const postresponse = await apiService.patch(
      "/api/customer/prescriptions/6/",
      JSON.stringify({ age: 40 })
    );

    console.log("postresponse : ", postresponse);
  };

  return (
    <div className="w-full flex flex-row items-center justify-between gap-x-2">
      <button className="border border-gray-400 flex flex-row py-1 px-2 w-full justify-center font-semibold text-[#676767] gap-x-1 text-lg rounded">
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-[25px] h-[25px]"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
          ></path>
        </svg>

        <h4>Cancel</h4>
      </button>

      <button className="border border-gray-400 flex flex-row py-1 px-2 w-full justify-center font-semibold text-[#676767] gap-x-1 text-lg rounded">
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-[25px] h-[25px]"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M144 0C117.5 0 96 21.5 96 48V96v28.5V176c0 8.8-7.2 16-16 16s-16-7.2-16-16V149.3l-9 7.5C40.4 169 32 187 32 206V244c0 38 16.9 74 46.1 98.3L128 384v96c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V374.7c46.9-19 80-65 80-118.7V176 160 144c0-26.5-21.5-48-48-48c-12.4 0-23.6 4.7-32.1 12.3C350 83.5 329.3 64 304 64c-12.4 0-23.6 4.7-32.1 12.3C270 51.5 249.3 32 224 32c-12.4 0-23.6 4.7-32.1 12.3C190 19.5 169.3 0 144 0z"
          ></path>
        </svg>

        <h4>Hold</h4>
      </button>

      <button className="border border-gray-400 flex flex-row py-1 px-2 w-full justify-center font-semibold text-[#676767] gap-x-1 text-lg rounded">
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-[25px] h-[25px]"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"
          ></path>
        </svg>

        <h4>Discount</h4>
      </button>

      <button
        onClick={() => handlePayment()}
        className="border border-gray-400 flex flex-row py-1 px-2 w-full justify-center font-semibold text-[#676767] gap-x-1 text-lg rounded"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="money-bill-1-wave"
          className="w-[25px] h-[25px]"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM128 416H64V352c35.3 0 64 28.7 64 64zM64 224V160h64c0 35.3-28.7 64-64 64zM448 352c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM384 256c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zM252 208c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h24 24c11 0 20-9 20-20s-9-20-20-20h-4V208c0-11-9-20-20-20H272c-11 0-20 9-20 20z"
          ></path>
        </svg>

        <h4>Pay Now</h4>
      </button>
    </div>
  );
};

export default LeftBottomNav;
