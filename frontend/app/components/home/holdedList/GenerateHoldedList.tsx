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
              className={`w-full h-[65px] flex flex-row text-gray-500 ${
                index % 2 === 1 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="w-[4%] h-full flex my-1 items-center pl-2">
                <h4>{index + 1}</h4>
              </div>

              <div className="w-[15%] h-full flex my-1 items-center pl-1">
                <h4>{customer.name}</h4>
              </div>

              <div className="w-[6%] h-full flex my-1 items-center pl-1">
                <h4>{customer.age}</h4>
              </div>

              <div className="w-[20%] h-full flex my-1 items-center pl-1">
                <h4>{customer?.email}</h4>
              </div>

              <div className="w-[15%] h-full flex my-1 items-center justify-center pl-1">
                <h4>{customer?.phone}</h4>
              </div>

              <div className="w-[25%] h-full flex my-1 items-center justify-center pl-1">
                <h4>{customer?.address}</h4>
              </div>

              <div className="w-[15%] h-full flex flex-col pl-1 items-center justify-center gap-y-[5px]">
                <button
                  className="w-full text-black bg-[#fcb900] mr-1 rounded-md hover:bg-[#c99402]"
                  // onClick={() => handleUpdateDetail(prescription, true)}
                >
                  Update
                </button>

                <button
                  className="w-full text-gray-100 bg-[#095959] mr-1 rounded-md hover:bg-[#0b8484] hover:text-white transition-colors duration-300"
                  // onClick={() => router.push(`/detail/${prescription.name}`)}
                >
                  Detail
                </button>
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default GenerateHoldedList;
