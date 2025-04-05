import { updateOrAddTmpCustomerInfo } from "@/lib/features/customerSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useState } from "react";

interface AddCustomerProps {
  setAddCustomerModal: (e: boolean) => void;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ setAddCustomerModal }) => {
  const dispatch = useAppDispatch();
  const cancelIconSvg = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="w-8 h-8"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path
        fill="currentColor"
        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
      ></path>
    </svg>
  );

  const [customerData, setCustomerData] = useState<any>({
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (customerData.name && customerData.age) {
      dispatch(
        updateOrAddTmpCustomerInfo({
          customerData: customerData,
          currentCustomer: true,
        })
      );
      setAddCustomerModal(false);
    }
    // console.log(customerData);
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center bg-black bg-opacity-50 z-[100]">
      <div className="relative min-w-[200px] max-w-[700px] h-[540px] mt-[65px] bg-white flex flex-col text-gray-600">
        <div className="w-full h-[40px] flex items-center my-4 px-4 text-xl font-semibold border-b border-gray-500">
          <h3>Add Customer</h3>
        </div>

        <button
          onClick={() => setAddCustomerModal(false)}
          className="absolute right-2 top-3"
        >
          {cancelIconSvg}
        </button>

        <form className="w-full flex flex-col space-y-4">
          <div className="w-full mx-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>

            <input
              // onFocus={() => setFocusedField("quantity")}
              type="text"
              name="name"
              value={customerData.name}
              onChange={handleChange}
              required
              className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-full mx-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Age
            </label>

            <input
              // onFocus={() => setFocusedField("quantity")}
              type="text"
              name="age"
              value={customerData.age}
              onChange={handleChange}
              required
              className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-full mx-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Phone (Optional)
            </label>

            <input
              // onFocus={() => setFocusedField("quantity")}
              type="text"
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
              //   required
              className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-full mx-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Email (Optional)
            </label>

            <input
              // onFocus={() => setFocusedField("quantity")}
              type="email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              //   required
              className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-full mx-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Address (Optional)
            </label>

            <input
              // onFocus={() => setFocusedField("quantity")}
              type="text"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              //   required
              className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-full flex flex-row-reverse items-center justify-start gap-x-2 px-4 pt-6">
            <button
              onSubmit={(e) => handleSubmit(e)}
              onClick={(e) => handleSubmit(e)}
              className="border border-gray-400 rounded-sm py-1 px-4 hover:bg-gray-400 hover:text-white font-semibold"
            >
              Add Customer
            </button>

            <button
              onClick={() => setAddCustomerModal(false)}
              className="border border-gray-400 rounded-sm py-1 px-4 hover:bg-gray-400 hover:text-white font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
