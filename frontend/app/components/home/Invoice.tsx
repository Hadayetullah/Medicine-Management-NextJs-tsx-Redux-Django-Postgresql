import React from "react";

const Invoice = () => {
  return (
    <div className="w-full mt-2">
      <div className="bg-[#b42a2b] w-full py-1 flex flex-row items-center text-white uppercase font-semibold text-sm">
        <span className="w-[30px]"></span>

        <div className="w-[30%]">
          <h4>Medicines</h4>
        </div>

        <div className="w-[20%]">
          <h4>Unit Price</h4>
        </div>

        <div className="w-[30%]">
          <h4>Quantity</h4>
        </div>

        <div className="w-[20%]">
          <h4>Total Price</h4>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
