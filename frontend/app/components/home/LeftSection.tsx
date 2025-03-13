import React, { useState } from "react";
import CustomerSection from "./CustomerSection";
import LeftBottomSection from "./LeftBottomSection";
import Invoice from "./Invoice";
import { MedicineType } from "@/lib/features/productSlice";
import AddCustomer from "./AddCustomer";

const LeftSection = () => {
  const [addCustomerModal, setAddCustomerModal] = useState<boolean>(false);

  const [customerData, setCustomerData] = useState<any>({
    name: "",
    age: "",
    phone: "",
    address: "",
    email: "",
    medicine_data: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(customerData);
  };

  return (
    <div className="relative w-full h-full border-r-[1px] border-gray-500">
      <div className="w-full h-full bg-white">
        <CustomerSection setAddCustomerModal={setAddCustomerModal} />
        <Invoice />
      </div>
      <LeftBottomSection />

      {addCustomerModal && (
        <AddCustomer
          customerData={customerData}
          handleChange={handleChange}
          setAddCustomerModal={setAddCustomerModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default LeftSection;
