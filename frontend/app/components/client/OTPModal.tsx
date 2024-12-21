"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setLoading } from "@/lib/features/authSlice";
import { useRouter } from "next/navigation";

interface OtpModalProps {
  email: string;
  onClose: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ email, onClose }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));

    const res = await fetch("/api/auth/otpverification/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const result = await res.json();
    if (result.success) {
      dispatch(setLoading(false));
      router.push(result.redirectTo); // Redirect to the root URL
    } else {
      dispatch(setLoading(false));
      setError(result.error);
      console.log(result.error);
      console.error("Error logging in");
    }

    // const result = await dispatch(verifyOtp({ email, otp }));
    // if (result.meta.requestStatus === "fulfilled") {
    //   onClose(); // Close the modal if OTP is verified
    // }
  };

  const { loading } = useAppSelector((state) => state.auth);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Verify OTP
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
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
              value={email}
              required
              // readOnly
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 mt-4 text-sm font-semibold text-indigo-600 bg-transparent rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
