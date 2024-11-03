"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validateAccessTokenLife, validateRefreshTokenLife } from "@/actions";
import { RootState, useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";

export default function AddMedicine() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    company: "",
    category: "",
    dosage_form: "",
    price: "",
    power: "",
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
    console.log("Add medicine data: ", formData);
    // const result = await dispatch(registerUser(formData));
    // if (result.meta.requestStatus === "fulfilled") {
    //   // Open OTP modal if registration is successful
    //   setEmailForOtp(formData.email);
    //   setShowOtpModal(true);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Add Medicine
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category/Brand
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="dosage_form"
              className="block text-sm font-medium text-gray-700"
            >
              Dosage Form
            </label>
            <input
              type="text"
              name="dosage_form"
              value={formData.dosage_form}
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
