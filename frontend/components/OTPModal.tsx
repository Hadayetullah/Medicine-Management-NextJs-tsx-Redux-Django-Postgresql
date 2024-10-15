import { useState } from "react";
import { useAppDispatch } from "../lib/store";
import { verifyOtp } from "../lib/features/authSlice";

interface OtpModalProps {
  email: string;
  onClose: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ email, onClose }) => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(verifyOtp({ email, otp }));
    if (result.meta.requestStatus === "fulfilled") {
      onClose(); // Close the modal if OTP is verified
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Verify OTP
        </h2>
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
              readOnly
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
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Verify OTP
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
