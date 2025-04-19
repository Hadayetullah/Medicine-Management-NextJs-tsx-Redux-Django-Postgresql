import { TmpCustomerPrescriptionType } from "@/lib/features/customerSlice";
import React from "react";

type Props = {
  tmpHoldedCustomers: TmpCustomerPrescriptionType[];
};

const GenerateHoldedList = (props: Props) => {
  return (
    <>
      {props.tmpHoldedCustomers.map(
        (customer: TmpCustomerPrescriptionType, index: number) => {
          return (
            <div
              key={index}
              className={`w-full h-[45px] flex flex-row text-gray-500 bg-white mb-2`}
            >
              <div className="w-[4%] h-full flex items-center pl-2">
                <h4>{index + 1}</h4>
              </div>

              <button className="w-[81%] h-full flex flex-row border border-gray-300 rounded-md hover:border-gray-500">
                <div className="w-[17%] h-full flex items-center pl-2">
                  <h4>{customer.name}</h4>
                </div>

                <div className="w-[4%] h-full flex items-center pl-1">
                  <h4>{customer.age}</h4>
                </div>

                <div className="w-[20%] h-full flex items-center pl-1">
                  <h4>{customer?.email}</h4>
                </div>

                <div className="w-[15%] h-full flex items-center justify-center pl-1">
                  <h4>{customer?.phone}</h4>
                </div>

                <div className="w-[25%] h-full flex items-center justify-center pl-1">
                  <h4>{customer?.address}</h4>
                </div>
              </button>

              <button
                className="w-[13%] h-full font-semibold text-gray-700 border border-[#fcb900] mr-1 ml-3 rounded-md hover:bg-[#c99402]"
                // onClick={() => handleUpdateDetail(prescription, true)}
              >
                Remove
              </button>
            </div>
          );
        }
      )}
    </>
  );
};

export default GenerateHoldedList;
