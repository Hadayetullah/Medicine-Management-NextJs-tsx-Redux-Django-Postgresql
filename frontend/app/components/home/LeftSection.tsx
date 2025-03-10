import React from "react";
import CustomerSection from "./CustomerSection";
import LeftBottomSection from "./LeftBottomSection";
import Invoice from "./Invoice";
import { MedicineType } from "@/lib/features/productSlice";

const LeftSection = () => {
  return (
    <div className="relative w-full h-full border-r-[1px] border-gray-500">
      <div className="w-full h-full bg-white">
        <CustomerSection />
        <Invoice />
      </div>
      <LeftBottomSection />
    </div>
  );
};

export default LeftSection;
