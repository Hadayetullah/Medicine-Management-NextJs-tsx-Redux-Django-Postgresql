"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateAccessTokenLife, validateRefreshTokenLife } from "@/actions";
import { RootState, useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { setLoading, validateAuthentication } from "@/lib/features/authSlice";

import { isValidProps } from "@/actions";

export default function Home() {
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [isPageLoading, setIsPageLoading] = useState(true); // Local loading state
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAccessTokenValid = await validateAccessTokenLife();

      if (!isAccessTokenValid) {
        const isRefreshTokenValid: isValidProps =
          await validateRefreshTokenLife();

        if (!isRefreshTokenValid.isTokenValid) {
          dispatch(validateAuthentication(false));
          router.push("/login");
          setIsPageLoading(false);
        } else {
          dispatch(validateAuthentication(true));
          setIsPageLoading(false);
        }
      } else {
        dispatch(validateAuthentication(true));
        setIsPageLoading(false);
      }
      setIsPageLoading(false);
    };

    checkAuth();
  }, [dispatch, router]);

  if (isPageLoading) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          Loading...
        </main>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          Hello
        </main>
      </div>
    );
  }
}
