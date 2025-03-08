import React, { useMemo, useState } from "react";
import SearchMedicine from "./SearchMedicine";
import Image from "next/image";
import DisplayMedicines from "./DisplayMedicines";

import { MedicineType } from "@/lib/features/productSlice";

interface RightSectionProps {
  medicineList: MedicineType[];
}

const RightSection: React.FC<RightSectionProps> = ({ medicineList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);

  const filteredMedicines = useMemo(() => {
    if (medicineList && medicineList.length > 0) {
      return medicineList.filter((medicine: MedicineType) =>
        medicine.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return [];
    }
  }, [medicineList, searchQuery]);

  return (
    <div className="w-full">
      <SearchMedicine
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="w-full h-[5px] bg-[#898888]"></div>
      <DisplayMedicines
        medicineList={medicineList}
        filteredMedicines={filteredMedicines}
      />
    </div>
  );
};

export default RightSection;
