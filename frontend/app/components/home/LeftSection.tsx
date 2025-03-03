import React from "react";
import CustomerSection from "./CustomerSection";
import LeftBottomNav from "./LeftBottomNav";
import Invoice from "./Invoice";

const LeftSection = () => {
  return (
    <div
      className="relative w-full h-full border-r-[1px] border-gray-500"
      style={{ overflow: "hidden" }}
    >
      <CustomerSection />
      <Invoice />
      <LeftBottomNav />
    </div>
  );
};

export default LeftSection;
