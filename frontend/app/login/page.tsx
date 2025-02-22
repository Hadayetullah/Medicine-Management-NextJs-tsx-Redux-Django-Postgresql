"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { setLoading } from "../../lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DisplayError from "../components/DisplayError";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.auth);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(setLoading(true));

  //   try {
  //     const response = await fetch("/api/auth/login/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.redirected) {
  //       const result = await response.json();
  //       setError(result.message || "Login failed");
  //     }
  //   } catch {
  //     setError("An unexpected error occurred.");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));

    const res = await fetch("/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    if (result.success) {
      dispatch(setLoading(false));
      router.push(result.redirectTo); // Redirect to the root URL
    } else {
      dispatch(setLoading(false));
      // if (result.error.non_field_errors[0].code === "user_inactive") {
      //   console.log(
      //     "Inactive error login: ",
      //     result.error.non_field_errors[0].code
      //   );
      // } else if (result.error) {
      //   setError(result.error);
      // } else {
      //   setError("Error registering user");
      // }
      console.log("Login Error : ", result);
      // console.error("Error logging in");
    }
  };

  // useEffect(() => {
  //   dispatch(setLoading(false));
  // }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Display Errors */}
        <DisplayError error={error} handleError={() => setError(null)} />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-100"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-100"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
