"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validateAccessTokenLife, validateRefreshTokenLife } from "@/actions";
import { RootState, useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import {
  refreshAccessToken,
  validateAuthentication,
} from "@/lib/features/authSlice";

import { isValidProps } from "@/actions";
import Loader from "@/components/Loader";

export default function Home() {
  const { loading, isAuthenticated, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  // const {} = useSelector((state: RootState) => state.employee);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [medicineData, setMedicineData] = useState();

  const handleActiveTitleAndData = (title: string) => {
    setCurrentTitle(title);
  };

  const checkAuth = () => {
    const isAccessTokenValid = validateAccessTokenLife();

    if (!isAccessTokenValid) {
      router.push("/login");
      dispatch(validateAuthentication(false));
      // const isRefreshTokenValid: isValidProps = validateRefreshTokenLife();

      // if (!isRefreshTokenValid.isTokenValid) {
      //   dispatch(validateAuthentication(false));
      //   router.push("/login");
      // } else {
      //   if (isRefreshTokenValid.refreshToken) {
      //     dispatch(refreshAccessToken(isRefreshTokenValid.refreshToken));
      //   } else {
      //     dispatch(validateAuthentication(false));
      //     router.push("/login");
      //   }
      // }
    }
    // else {
    //   dispatch(validateAuthentication(true));
    // }
  };

  const hasRunEffect = useRef(false);

  useEffect(() => {
    if (isAuthenticated && accessToken && !hasRunEffect.current) {
      hasRunEffect.current = true; // Mark effect as run
      dispatch({ type: "websocket/connect", payload: accessToken });
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    checkAuth();
  }, [dispatch, router]);

  if (loading || !isAuthenticated) {
    return <Loader />;
  } else {
    return (
      <div className="min-w-[190px] max-w-[300px] flex flex-row items-center justify-center gap-3 mt-[70px] mb-2 mx-auto">
        <button
          onClick={() => handleActiveTitleAndData("all")}
          className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
            currentTitle === "all" ? "bg-blue-900" : "bg-blue-500"
          }`}
        >
          All
        </button>

        <button
          onClick={() => handleActiveTitleAndData("searched")}
          className={`hover:bg-blue-900 text-white w-full py-1 px-2 rounded-md ${
            currentTitle === "searched" ? "bg-blue-900" : "bg-blue-500"
          }`}
        >
          Searched
        </button>
      </div>
    );
  }
}
