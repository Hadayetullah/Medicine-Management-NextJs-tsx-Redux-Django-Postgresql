import React, { useState } from "react";
import SearchMedicine from "./SearchMedicine";

const RightSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="w-full">
      <SearchMedicine
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default RightSection;
