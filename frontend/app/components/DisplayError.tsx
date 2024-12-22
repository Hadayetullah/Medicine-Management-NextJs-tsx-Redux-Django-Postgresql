import React from "react";

interface DisplayErrorProps {
  error: any;
  handleError: () => void;
}

const DisplayError: React.FC<DisplayErrorProps> = ({ error, handleError }) => {
  let errorMsg;

  if (error && typeof error === "string") {
    errorMsg = (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 flex justify-between items-center">
        <p>{error}</p>
        <div className="hover:text-white hover:bg-red-400 rounded-full cursor-pointer transition-colors">
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
    );
  } else if (error && typeof error === "object") {
    errorMsg = Object.keys(error).map((key) => {
      return error[key].map((message: string, index: boolean) => (
        <div
          key={key + index}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 flex justify-between items-center"
        >
          <p>{message}</p>
          <div className="hover:text-white hover:bg-red-400 rounded-full cursor-pointer transition-colors">
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
      ));
    });
  }

  return <>{error ? errorMsg : null}</>;
};

export default DisplayError;
