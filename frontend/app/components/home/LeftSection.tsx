import React from "react";
import CustomerSection from "./CustomerSection";
import LeftBottomSection from "./LeftBottomSection";
import Invoice from "./Invoice";

const LeftSection = () => {
  return (
    <div
      className="relative w-full h-full border-r-[1px] border-gray-500"
      style={{ overflow: "hidden" }}
    >
      <CustomerSection />
      <Invoice />
      <LeftBottomSection />
    </div>
  );
};

export default LeftSection;
