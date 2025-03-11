import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import SearchMedicine from "./SearchMedicine";
import DisplayMedicines from "./DisplayMedicines";

import { decreaseQuantity, MedicineType } from "@/lib/features/productSlice";
import {
  addOrUpdateMedicine,
  addTmpMedicine,
  updateTmpMedicine,
} from "@/lib/features/customerSlice";

const RightSection = () => {
  const dispatch = useAppDispatch();
  const { medicineList } = useAppSelector((state) => state.product);
  const { tmpInvoice } = useAppSelector((state) => state.customer);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedicines = useMemo(() => {
    if (medicineList && medicineList.length > 0) {
      return medicineList.filter((medicine: MedicineType) =>
        medicine.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return [];
    }
  }, [medicineList, searchQuery]);

  const handleInvoiceList = (
    medicine: MedicineType,
    index: number,
    id: string
  ) => {
    const existingMedicineIndex = tmpInvoice.findIndex(
      (item) => item?.id === id
    );

    if (existingMedicineIndex !== -1) {
      dispatch(decreaseQuantity(index));
      dispatch(updateTmpMedicine(existingMedicineIndex));
      // tmpInvoice[existingMedicineIndex].quantity += 1;
    } else {
      dispatch(decreaseQuantity(index));
      dispatch(addTmpMedicine(medicine));
      // tmpInvoice.push({ ...action.payload, quantity: 1 });
    }

    // dispatch(addOrUpdateMedicine(medicine));
    // console.log("medicine : ", medicine);
  };

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
        handleInvoiceList={handleInvoiceList}
      />
    </div>
  );
};

export default RightSection;
