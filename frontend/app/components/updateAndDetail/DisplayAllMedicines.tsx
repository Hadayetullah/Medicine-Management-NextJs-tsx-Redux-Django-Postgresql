import React from "react";

import { MedicineType } from "@/lib/features/productSlice";
import { useRouter } from "next/navigation";

interface DisplayAllMedicinesProps {
  medicineList: MedicineType[];
  handleUpdateDetail: (data: any, modalStatus: boolean) => void;
}

const DisplayAllMedicines: React.FC<DisplayAllMedicinesProps> = ({
  medicineList,
  handleUpdateDetail,
}) => {
  const router = useRouter();

  return (
    <>
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

            <div className="w-[10%] h-full flex my-1 ml-1 pl-[1%]">
              <h4>{medicine.quantity}</h4>
            </div>

            <div className="w-[13%] h-full flex my-1 flex-col pl-1 items-center gap-[3px]">
              <button
                className="w-full text-black bg-[#fcb900] mr-1 rounded-md hover:bg-[#c99402]"
                onClick={() => handleUpdateDetail(medicine, true)}
              >
                Update
              </button>

              <button
                className="w-full text-gray-100 bg-[#095959] mr-1 rounded-md hover:bg-[#0b8484] hover:text-white transition-colors duration-300"
                onClick={() => router.push(`/detail/${medicine.name}`)}
              >
                Detail
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DisplayAllMedicines;
