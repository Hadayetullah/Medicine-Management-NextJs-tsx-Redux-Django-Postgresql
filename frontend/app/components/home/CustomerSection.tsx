import React, { useState } from "react";
import AddCustomer from "./AddCustomer";
import { useAppSelector } from "@/lib/hooks";

const CustomerSection = () => {
  const { tmpCustomerPrescription } = useAppSelector((state) => state.customer);

  const [addCustomerModal, setAddCustomerModal] = useState<boolean>(false);
  return (
    <div className="bg-[#E6E8EA] w-full flex flex-row justify-between items-center py-2 px-4 rounded-[3px]">
      <div className="flex flex-row items-center">
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-9 h-9 text-gray-500"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"
          ></path>
        </svg>

        <h4 className="ml-2 text-gray-700 font-semibold text-lg">
          {tmpCustomerPrescription != null
            ? `${tmpCustomerPrescription.name} (${tmpCustomerPrescription.age})`
            : "No active customer!"}
        </h4>
      </div>

      <button onClick={() => setAddCustomerModal(true)}>
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-9 h-9 text-gray-500 hover:text-gray-800"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
          ></path>
        </svg>
      </button>

      {addCustomerModal && (
        <AddCustomer setAddCustomerModal={setAddCustomerModal} />
      )}
    </div>
  );
};

export default CustomerSection;
