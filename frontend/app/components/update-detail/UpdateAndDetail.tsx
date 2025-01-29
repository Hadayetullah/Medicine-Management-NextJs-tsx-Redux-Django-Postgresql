"use client";

import { sendWebSocketMessages } from "@/app/actions/apiActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";

interface UpdateAndDetailProps {
  selectedMedicine: any;
  setUpdateDetailModal: (e: boolean) => void;
}

const UpdateAndDetail: React.FC<UpdateAndDetailProps> = ({
  selectedMedicine,
  setUpdateDetailModal,
}) => {
  const { subAction } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<any>({
    quantity: "",
    name: "",
    company: "",
    category: "",
    dosage_form: "",
    price: "",
    power: "",
    shelf_no: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string>("");

  useEffect(() => {
    if (subAction != "") {
      setIsProcessing("");
      dispatch({ type: "websocket/setSubAction", payload: { subAction: "" } });
    }
  }, [subAction]);

  useEffect(() => {
    setFormData({
      quantity: selectedMedicine?.quantity || "",
      name: selectedMedicine?.name || "",
      company: selectedMedicine?.company?.name || "",
      category: selectedMedicine?.category?.name || "",
      dosage_form: selectedMedicine?.dosage_form?.name || "",
      price: selectedMedicine?.price || "",
      power: selectedMedicine?.power || "",
      shelf_no: selectedMedicine?.shelf_no || "",
    });
  }, [selectedMedicine]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent, field: string) => {
    e.preventDefault();

    setIsProcessing(field);

    const dataObj = {
      action: "update_medicine",
      data: {
        id: selectedMedicine.id,
        action: field,
        value: formData[field],
      },
    };

    dispatch(
      sendWebSocketMessages({
        connectionKey: "medicineConnection",
        message: dataObj,
      })
    );

    console.log("Field : ", field);
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
              <form
                onSubmit={(e) => handleSubmit(e, "quantity")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Increase Quantity
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("quantity")}
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the quantity first"
                    onClick={(e) => handleSubmit(e, "quantity")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "quantity" || isProcessing === "quantity"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      focusedField != "quantity" || isProcessing === "quantity"
                    }
                  >
                    {isProcessing === "quantity" ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={(e) => handleSubmit(e, "name")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Medicine Name
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("name")}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the medicine name first"
                    onClick={(e) => handleSubmit(e, "name")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "name" || isProcessing === "name"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={focusedField != "name" || isProcessing === "name"}
                  >
                    {isProcessing === "name" ? "Modifying..." : "Modify"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={(e) => handleSubmit(e, "company")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Company Name
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("company")}
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the company name first"
                    onClick={(e) => handleSubmit(e, "company")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "company" || isProcessing === "company"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      focusedField != "company" || isProcessing === "company"
                    }
                  >
                    {isProcessing === "company" ? "Modifying..." : "Modify"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={(e) => handleSubmit(e, "dosage_form")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="dosage_form"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Dosage Form
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("dosage_form")}
                    type="text"
                    name="dosage_form"
                    value={formData.dosage_form}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the dosage form first"
                    onClick={(e) => handleSubmit(e, "dosage_form")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "dosage_form" ||
                      isProcessing === "dosage_form"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      focusedField != "dosage_form" ||
                      isProcessing === "dosage_form"
                    }
                  >
                    {isProcessing === "dosage_form" ? "Modifying..." : "Modify"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={(e) => handleSubmit(e, "price")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Price
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("price")}
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the price first"
                    onClick={(e) => handleSubmit(e, "price")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "price" || isProcessing === "price"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      focusedField != "price" || isProcessing === "price"
                    }
                  >
                    {isProcessing === "price" ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={(e) => handleSubmit(e, "power")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="power"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modify Power
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("power")}
                    type="text"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please modify the power first"
                    onClick={(e) => handleSubmit(e, "power")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "power" || isProcessing === "power"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      focusedField != "power" || isProcessing === "power"
                    }
                  >
                    {isProcessing === "power" ? "Modifying..." : "Modify"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={(e) => handleSubmit(e, "shelf_no")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="shelf_no"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Shelf Number
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("shelf_no")}
                    type="text"
                    name="shelf_no"
                    value={formData.shelf_no}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the shelf number first"
                    onClick={(e) => handleSubmit(e, "shelf_no")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "shelf_no" || isProcessing === "shelf_no"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      focusedField != "shelf_no" || isProcessing === "shelf_no"
                    }
                  >
                    {isProcessing === "shelf_no" ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>

              <form
                onSubmit={(e) => handleSubmit(e, "category")}
                className="flex flex-col mb-[20px]"
              >
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Category/Brand Name
                </label>

                <div className="flex gap-x-[10px] gap-y-[5px] flex-wrap">
                  <input
                    onFocus={() => setFocusedField("category")}
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full sm:w-[400px] px-3 py-2 h-[40px] border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  <button
                    title="Please update the category name first"
                    onClick={(e) => handleSubmit(e, "category")}
                    type="submit"
                    className={`w-[200px] px-4 py-2 h-[40px] text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
                      focusedField != "category" || isProcessing === "category"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      focusedField != "category" || isProcessing === "category"
                    }
                  >
                    {isProcessing === "category" ? "Updating..." : "Update"}
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
