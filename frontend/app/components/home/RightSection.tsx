import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import SearchMedicine from "./SearchMedicine";
import DisplayMedicines from "./DisplayMedicines";

import {
  IncreaseMedicineListQuantity,
  decreaseMedicineListQuantity,
  MedicineType,
} from "@/lib/features/productSlice";
import {
  addTmpMedicine,
  IncreaseTmpMedicineQuantity,
  decreaseTmpMedicineQuantity,
} from "@/lib/features/customerSlice";
import AddCustomer from "./AddCustomer";

const RightSection = () => {
  const dispatch = useAppDispatch();
  const { medicineList } = useAppSelector((state) => state.product);
  const { tmpCustomerPrescription, currentCustomer } = useAppSelector(
    (state) => state.customer
  );

  const [addCustomerModal, setAddCustomerModal] = useState<boolean>(false);

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
    id: string,
    quantity: number
  ) => {
    if (currentCustomer === false) {
      setAddCustomerModal(true);
    } else {
      const existingMedicineIndex =
        tmpCustomerPrescription.tmpInvoice.findIndex((item) => item?.id === id);

      if (existingMedicineIndex !== -1) {
        if (quantity > 0) {
          dispatch(decreaseMedicineListQuantity(index));
          dispatch(IncreaseTmpMedicineQuantity(existingMedicineIndex));
        }
      } else {
        dispatch(decreaseMedicineListQuantity(index));
        dispatch(addTmpMedicine({ medicine, index }));
      }
    }
  };

  return (
    <div className="relative w-full">
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

      {addCustomerModal && (
        <AddCustomer setAddCustomerModal={setAddCustomerModal} />
      )}
    </div>
  );
};

export default RightSection;
