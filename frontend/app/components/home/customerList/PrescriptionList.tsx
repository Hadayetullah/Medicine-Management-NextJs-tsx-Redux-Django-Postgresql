import React, { useMemo, useState } from "react";

import { PrescriptionsType } from "@/lib/features/prescriptionsSlice";
import PrescriptionListSearchBar from "../../searchFields/PrescriptionListSearchBar";
import GeneratePrescriptionList from "./GeneratePrescriptionList";

interface PrescriptionListProps {
  setPrescriptionListModal: (e: boolean) => void;
  customersPrescriptionList: PrescriptionsType[];
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({
  setPrescriptionListModal,
  customersPrescriptionList,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPrescriptions = useMemo(() => {
    // if (!searchQuery.trim()) {
    //   return; // Clear search results if searchQuery is empty
    // }

    if (
      customersPrescriptionList !== undefined &&
      customersPrescriptionList.length > 0
    ) {
      const matchedPrescription = customersPrescriptionList.find(
        (customer: PrescriptionsType) =>
          Number(customer.id) === Number(searchQuery)
      );

      return matchedPrescription ? [matchedPrescription] : [];
    }

    return [];
  }, [customersPrescriptionList, searchQuery]);

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center bg-black bg-opacity-50 z-[101]">
      <div className="relative w-[calc(100%-5px)] sm:w-[calc(100%-100px)] 2xl:w-[1450px] h-[calc(100vh-20px)] mt-[10px] bg-white flex flex-col text-gray-600">
        <div className="w-full h-[40px] flex items-center my-4 px-1 sm:px-4 text-md sm:text-xl font-semibold border-b border-gray-500">
          <h3>List of prescriptions</h3>
        </div>

        <button
          onClick={() => setPrescriptionListModal(false)}
          className="absolute top-[5px] right-[5px] sm:right-[15px] w-[25px] sm:w-[30px] h-[25px] sm:h-[30px]"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="xmark"
            className="svg-inline--fa fa-xmark"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            ></path>
          </svg>
        </button>

        <div className="w-full px-0 sm:px-2">
          <PrescriptionListSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="w-full mt-10 mb-5">
            <div
              className="overflow-x-auto overflow-y-hidden w-full h-full"
              style={{ scrollbarWidth: "thin", zIndex: "-1" }}
            >
              <div className="w-[1050px] md:w-[1150px] xl:w-full">
                <div className="h-[40px] w-full bg-gray-100 font-bold text-xs md:text-sm text-gray-500 flex flex-row pl-1 sm:pl-2.5 pr-4">
                  <div className="w-[4%] h-full flex items-center pl-2">
                    <h4>ID</h4>
                  </div>

                  <div className="w-[15%] h-full flex items-center pl-2">
                    <h4>Name</h4>
                  </div>

                  <div className="w-[6%] h-full flex items-center pl-1">
                    <h4>Age</h4>
                  </div>

                  <div className="w-[20%] h-full flex items-center pl-1">
                    <h4>Email</h4>
                  </div>

                  <div className="w-[15%] h-full flex items-center pl-1">
                    <h4>Phone</h4>
                  </div>

                  <div className="w-[25%] h-full flex items-center justify-start pl-1">
                    <h4>Address</h4>
                  </div>

                  <div className="w-[15%] h-full flex items-center justify-center pl-1">
                    <h4>Update/Detail</h4>
                  </div>
                </div>

                <div
                  className="overflow-y-auto overflow-x-hidden text-sm md:text-base w-full h-[calc(100vh-250px)] bg-gray-100 pl-1 sm:pl-2.5"
                  style={{ scrollbarWidth: "thin", zIndex: "-1" }}
                >
                  {filteredPrescriptions !== undefined && searchQuery !== "" ? (
                    filteredPrescriptions.length > 0 ? (
                      <GeneratePrescriptionList
                        prescriptionList={filteredPrescriptions}
                      />
                    ) : (
                      <h4 className="text-center text-lg xl:text-xl text-gray-500 mt-4">
                        No Prescription Found
                      </h4>
                    )
                  ) : customersPrescriptionList.length > 0 ? (
                    <GeneratePrescriptionList
                      prescriptionList={customersPrescriptionList}
                    />
                  ) : (
                    <h4 className="text-center text-lg xl:text-xl text-gray-500 mt-4">
                      No Prescription Available
                    </h4>
                  )}
                </div>

                {/* <div
              className="overflow-y-scroll overflow-x-hidden text-sm md:text-base w-full h-full bg-gray-100 pl-1 sm:pl-2.5"
              style={{ scrollbarWidth: "thin", zIndex: "-1" }}
            >
              <div className="w-full min-h-[60vh] max-h-[75vh] pb-5 bg-white">
                {customersPrescriptionList?.length > 0 ? (
                  <div className="w-full h-full">
                    {filteredMedicines.length > 0 ? (
                      <DisplaySearchedMedicines
                        filteredMedicines={filteredMedicines}
                        handleUpdateDetail={handleUpdateDetail}
                      />
                    ) : (
                      <DisplayAllMedicines
                        medicineList={medicineList}
                        handleUpdateDetail={handleUpdateDetail}
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-[200px]">
                    <h4 className="text-lg text-gray-500 font-semibold">
                      No data available
                    </h4>
                  </div>
                )}
              </div>
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionList;
