import React from "react";

type Props = {
  prescriptionList: any;
};

const GeneratePrescriptionList = (props: Props) => {
  return (
    <>
      {props.prescriptionList.map((prescription: any, index: number) => {
        return (
          <div
            key={index}
            className={`w-full h-[65px] flex flex-row text-gray-500 ${
              index % 2 === 1 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="w-[4%] h-full flex my-1 items-center pl-2">
              <h4>{prescription.id}</h4>
            </div>

            <div className="w-[15%] h-full flex my-1 items-center pl-1">
              <h4>{prescription.name}</h4>
            </div>

            <div className="w-[6%] h-full flex my-1 items-center pl-1">
              <h4>{prescription.age}</h4>
            </div>

            <div className="w-[20%] h-full flex my-1 items-center pl-1">
              <h4>{prescription?.email}</h4>
            </div>

            <div className="w-[15%] h-full flex my-1 items-center justify-center pl-1">
              <h4>{prescription?.phone}</h4>
            </div>

            <div className="w-[25%] h-full flex my-1 items-center justify-center pl-1">
              <h4>{prescription?.address}</h4>
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
      })}
    </>
  );
};

export default GeneratePrescriptionList;
