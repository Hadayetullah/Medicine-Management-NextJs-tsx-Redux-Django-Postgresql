"use client";

import { useAppDispatch } from "@/lib/hooks";
import React, { useState } from "react";

interface DataProps {
  isDisabled: boolean;
  isProcessing: boolean;
}

interface UpdateAndDetailProps {
  setUpdateDetailModal: (e: boolean) => void;
}

const UpdateAndDetail: React.FC<UpdateAndDetailProps> = ({
  setUpdateDetailModal,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    quantity: "",
    name: "",
    company_name: "",
    category_name: "",
    dosage_form_name: "",
    price: "",
    power: "",
    shelf_no: "",
  });

  const [quantityLoading, setQuantityLoading] = useState<DataProps>({
    isDisabled: true,
    isProcessing: false,
  });
  const [nameLoading, setNameLoading] = useState<DataProps>({
    isDisabled: true,
    isProcessing: false,
  });
  const [companyNameLoading, setCompanyNameLoading] = useState<DataProps>({
    isDisabled: true,
    isProcessing: false,
  });
  const [categoryNameLoading, setCategoryNameLoading] = useState<DataProps>({
    isDisabled: true,
    isProcessing: false,
  });
  const [dosageFormNameLoading, setDosageFormNameLoading] = useState<DataProps>(
    {
      isDisabled: true,
      isProcessing: false,
    }
  );
  const [priceLoading, setPriceLoading] = useState<DataProps>({
    isDisabled: true,
    isProcessing: false,
  });
  const [powerLoading, setPowerLoading] = useState<DataProps>({
    isDisabled: true,
    isProcessing: false,
  });
  const [selfNoLoading, setSelfNoLoading] = useState<DataProps>({
    isDisabled: true,
    isProcessing: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center bg-black bg-opacity-50 z-[11]">
      <div className="relative w-[700px] h-full flex justify-center">
        <div className="relative py-6 px-1 w-full h-[85%] sm:p-8 my-[70px] bg-white rounded shadow-lg">
          <button
            onClick={() => setUpdateDetailModal(false)}
            className="absolute top-[5px] right-[15px] w-[30px] h-[30px]"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="xmark"
              className="svg-inline--fa fa-xmark"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              ></path>
            </svg>
          </button>

          <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
            Update / Modify
          </h2>

          <div className="w-full h-full pb-5 overflow-hidden">
            <div className="w-full h-full pb-5 overflow-y-scroll">
              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Increase Quantity
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the quantity first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      quantityLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={quantityLoading.isDisabled}
                  >
                    {quantityLoading.isProcessing ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Medicine Name
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the medicine name first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      nameLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={nameLoading.isDisabled}
                  >
                    {nameLoading.isProcessing ? "Modifying..." : "Modify"}
                  </button>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="company_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Company Name
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the company name first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      companyNameLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={companyNameLoading.isDisabled}
                  >
                    {companyNameLoading.isProcessing
                      ? "Modifying..."
                      : "Modify"}
                  </button>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="dosage_form_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Dosage Form
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="dosage_form_name"
                    value={formData.dosage_form_name}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the dosage form first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      dosageFormNameLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={dosageFormNameLoading.isDisabled}
                  >
                    {dosageFormNameLoading.isProcessing
                      ? "Modifying..."
                      : "Modify"}
                  </button>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Price
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the price first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      priceLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={priceLoading.isDisabled}
                  >
                    {priceLoading.isProcessing ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="power"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Power
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the power first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      powerLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={powerLoading.isDisabled}
                  >
                    {powerLoading.isProcessing ? "Modifying..." : "Modify"}
                  </button>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="shelf_no"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Shelf Number
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="shelf_no"
                    value={formData.shelf_no}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the shelf number first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      selfNoLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={selfNoLoading.isDisabled}
                  >
                    {selfNoLoading.isProcessing ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="flex flex-col mb-[20px]">
                <label
                  htmlFor="category_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Category/Brand Name
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    type="text"
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the category name first"
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      categoryNameLoading.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={categoryNameLoading.isDisabled}
                  >
                    {categoryNameLoading.isProcessing
                      ? "Updating..."
                      : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAndDetail;
