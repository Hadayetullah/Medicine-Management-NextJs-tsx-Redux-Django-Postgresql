"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validateAccessTokenLife, validateRefreshTokenLife } from "@/actions";
import { RootState, useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import {
  refreshAccessToken,
  validateAuthentication,
} from "@/lib/features/authSlice";

import { isValidProps } from "@/actions";

export default function Home() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathName = usePathname();

  const checkAuth = () => {
    const isAccessTokenValid = validateAccessTokenLife();

    if (!isAccessTokenValid) {
      const isRefreshTokenValid: isValidProps = validateRefreshTokenLife();

      if (!isRefreshTokenValid.isTokenValid) {
        dispatch(validateAuthentication(false));
        router.push("/login");
      } else {
        if (isRefreshTokenValid.refreshToken) {
          dispatch(refreshAccessToken(isRefreshTokenValid.refreshToken));
        } else {
          dispatch(validateAuthentication(false));
          router.push("/login");
        }
      }
    } else {
      dispatch(validateAuthentication(true));
    }
  };

  useEffect(() => {
    console.log("Home Inside useEffect: ", isAuthenticated);
    checkAuth();
  }, [dispatch, router, isAuthenticated]);

  console.log("Home Outside useEffect: ", isAuthenticated);

  // if (isAuthenticated && pathName === "/") {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Hello
      </main>
    </div>
  );
  // }

  // else {
  //   return (
  //     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  //       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
  //         Loading...
  //       </main>
  //     </div>
  //   );
  // }
}
