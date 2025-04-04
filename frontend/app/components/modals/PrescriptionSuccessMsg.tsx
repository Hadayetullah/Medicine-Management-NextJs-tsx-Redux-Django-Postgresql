import React from "react";

interface PrescriptionSuccessMsgProps {
  prescriptionsSliceMsg: string;
  setMsgModal: (e: boolean) => void;
  msgModal: boolean;
}
const PrescriptionSuccessMsg: React.FC<PrescriptionSuccessMsgProps> = ({
  prescriptionsSliceMsg,
  setMsgModal,
  msgModal,
}) => {
  return (
    <div
      className={`absolute left-0 right-0 w-full top-[90px] ${
        msgModal ? "z-[102]" : "z-[-1]"
      } flex items-center justify-center`}
    >
      <div className="w-[160px] sm:w-[350px]">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 flex justify-between items-center">
          <p>{prescriptionsSliceMsg}</p>
          <div
            onClick={() => setMsgModal(false)}
            className="hover:text-white hover:bg-green-400 rounded-full cursor-pointer transition-colors"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionSuccessMsg;
