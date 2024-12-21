"use client";

import { useState } from "react";
import { setLoading } from "../../lib/features/authSlice";
import OtpModal from "../components/client/OTPModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Register = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });

  const [emailForOtp, setEmailForOtp] = useState<string | null>(null);
  // const [error, setError] = useState<any>(null);
  const [error, setError] = useState<{ [key: string]: string[] }>({});

  // const errorMessages = Object.keys(error).map((key) => {
  //   return error[key].map((message, index) => (
  //     <p key={`${key}-${index}`} className="text-red-500">
  //       {key}: {message}
  //     </p>
  //   ));
  // });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));

    const res = await fetch("/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    console.log("Signup Result: ", result);
    if (result.success) {
      dispatch(setLoading(false));
      setEmailForOtp(result.email);
    } else {
      setEmailForOtp(null);
      dispatch(setLoading(false));
      setError(result.error);
      console.log(result.error);
      console.error("Error logging in");
    }

    // const result = await dispatch(registerUser(formData));
    // if (result.meta.requestStatus === "fulfilled") {
    //   // Open OTP modal if registration is successful
    //   setEmailForOtp(formData.email);
    //   setShowOtpModal(true);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Register
        </h2>

        {/* Display Errors */}
        {Object.keys(error).length > 0 && (
          <div className="space-y-2">
            {Object.keys(error).map((key) =>
              error[key].map((message, index) => (
                <p key={`${key}-${index}`} className="text-red-500">
                  {key}: {message}
                </p>
              ))
            )}
          </div>
        )}

        {/* {error && (
          <>
            {error.map((err: any, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4"
                >
                  {err}
                </div>
              );
            })}
          </>
        )} */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
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
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign Up"}
          </button>
        </form>

        {/* OTP Modal */}
        {emailForOtp && (
          <OtpModal email={emailForOtp} onClose={() => setEmailForOtp(null)} />
        )}
      </div>
    </div>
  );
};

export default Register;
