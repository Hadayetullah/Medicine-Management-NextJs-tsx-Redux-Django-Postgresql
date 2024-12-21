import React from "react";

interface DisplayErrorProps {
  error: any;
  handleError: () => void;
}

const DisplayError: React.FC<DisplayErrorProps> = ({ error, handleError }) => {
  let errorMsg;

  if (error && typeof error === "string") {
    errorMsg = (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
        {error}
      </div>
    );
  } else if (error && typeof error === "object") {
    errorMsg = Object.keys(error).map((key) => {
      return error[key].map((message: string, index: boolean) => (
        <div
          key={key + index}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4"
        >
          {message}
        </div>
      ));
    });
  }

  return <>{error ? errorMsg : null}</>;
};

export default DisplayError;
