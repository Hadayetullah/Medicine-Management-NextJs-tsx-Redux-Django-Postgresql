"use client";

import { useEffect, useState } from "react";
import { sendWebSocketMessages } from "../actions/apiActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FetchMedicinesHandleSockets } from "../actions/clientActions";
import Loader from "../components/client/Loader";
// import { usePathname, useRouter } from "next/navigation";

export default function AddMedicinePage() {
  const {
    connectionDetails,
    loading: productLoading,
    message,
    error: productError,
    connections,
    medicineList,
  } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    action: "add_medicine",
    name: "",
    company_name: "",
    category_name: "",
    dosage_form_name: "",
    price: "",
    power: "",
    quantity: "",
    shelf_no: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form data : ", formData);

    dispatch(
      sendWebSocketMessages({
        connectionKey: "medicineConnection",
        message: formData,
      })
    );
    // const result = dispatch(addMedicine(formData));
    // result.then((response) => console.log(response));
  };

  // useEffect(() => {
  //   console.log("State Medicine : ", medicineList);
  // }, [dispatch, medicineList]);

  useEffect(() => {
    const handleFetchMedicinesHandleSockets = async () => {
      if (medicineList === undefined || medicineList.length < 1) {
        const medicineListLength = medicineList.length;
        setLoading(true);
        const isLoading = await FetchMedicinesHandleSockets({
          dispatch,
          medicineListLength,
          connections,
          connectionDetails,
        });
        setLoading(isLoading); // Update the state with the returned value
      }
    };

    handleFetchMedicinesHandleSockets();
  }, []);

  if (productLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Add Medicine
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Medicine Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="company_name"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="category_name"
              className="block text-sm font-medium text-gray-700"
            >
              Category/Brand
            </label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="dosage_form_name"
              className="block text-sm font-medium text-gray-700"
            >
              Dosage Form
            </label>
            <input
              type="text"
              name="dosage_form_name"
              value={formData.dosage_form_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="power"
              className="block text-sm font-medium text-gray-700"
            >
              Power
            </label>
            <input
              type="text"
              name="power"
              value={formData.power}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="shelf_no"
              className="block text-sm font-medium text-gray-700"
            >
              Shelf No.
            </label>
            <input
              type="text"
              name="shelf_no"
              value={formData.shelf_no}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
