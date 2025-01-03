"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/app/actions/apiActions";
import { websocketEventEmitter } from "@/app/utils/websocketMiddlewareUtil";
import { setMessage } from "@/lib/features/productSlice";
import Authenticated from "./Authenticated";

const Navbar = () => {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const pathName = path.split("/");
  // console.log(pathName[0] == "");

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [toggleUser, setToggleUser] = useState<boolean>(false);
  const [isAccessTokenExpired, setIsAccessTokenExpired] =
    useState<boolean>(true);

  const handleLogout = async () => {
    const logoutResponse = await logout();
    if (logoutResponse.success) {
      console.log("Logout logoutResponse: ", logoutResponse.data);
      setToggleUser(false);
      router.push("/login");
    } else {
      console.log("Logout logoutResponse: ", logoutResponse.error);
      setToggleUser(false);
      router.push("/login");
    }
  };

  const handleSettings = () => {
    setToggleUser(false);
    router.push("/settings");
  };

  useEffect(() => {
    const socketConnectionHandler = ({
      connectionKey,
      data,
    }: {
      connectionKey: string;
      data: any;
    }) => {
      if (connectionKey === "medicineConnection" && data === 1) {
        console.log(`Connection opened for ${connectionKey}`);
      }
    };

    const messageHandler = ({
      connectionKey,
      data,
    }: {
      connectionKey: string;
      data: any;
    }) => {
      console.log(`Message for ${connectionKey}:`, data);
      dispatch(setMessage(data));
    };

    const socketErrorHandler = ({
      connectionKey,
      data,
    }: {
      connectionKey: string;
      data: any;
    }) => {
      console.log(`Error for ${connectionKey}:`, data);
      dispatch(setMessage(data));
    };

    const socketCloseHandler = ({
      connectionKey,
      data,
    }: {
      connectionKey: string;
      data: any;
    }) => {
      console.log(`Closed connection for ${connectionKey}:`, data);
      dispatch(setMessage(data));
    };

    websocketEventEmitter.on("open", socketConnectionHandler);
    websocketEventEmitter.on("message", messageHandler);
    websocketEventEmitter.on("error", socketErrorHandler);
    websocketEventEmitter.on("close", socketCloseHandler);

    // Cleanup the listener on component unmount
    return () => {
      websocketEventEmitter.off("open", messageHandler);
      websocketEventEmitter.off("message", messageHandler);
      websocketEventEmitter.off("error", socketErrorHandler);
      websocketEventEmitter.off("close", socketCloseHandler);
    };
  }, [dispatch]);

  useEffect(() => {
    if (path !== "/login" && path !== "/signup") {
      setIsAccessTokenExpired(false);
    } else {
      setIsAccessTokenExpired(true);
    }
  }, [path]);

  const notAuthenticated = (
    <div className="container mx-auto w-full flex items-center flex-row justify-between p-0 sm:px-[5%]">
      <div className="w-full flex items-left sm:items-center">
        <Link href={"/"} className="text-white">
          LOGO
        </Link>
      </div>

      <div className="flex w-full relative">
        <div className="absolute top-[-14px] right-0">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-white cursor-pointer sm:hidden"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        <ul className="hidden flex-row w-full justify-start sm:justify-end sm:flex text-white space-x-2">
          <li className="flex items-center justify-center">
            <Link
              href="/signup"
              className={`hover:bg-indigo-700 py-1 px-2 rounded-md ${
                path === "/signup" ? "bg-indigo-700" : ""
              }`}
            >
              Signup
            </Link>
          </li>

          <li className="flex items-center justify-center">
            <Link
              href="/login"
              className={`hover:bg-indigo-700 py-1 px-2 rounded-md ${
                path === "/login" ? "bg-indigo-700" : ""
              }`}
            >
              Login
            </Link>
          </li>
        </ul>

        {toggleMenu && (
          <div className="flex flex-col w-full absolute right-0 top-6 bg-white min-w-[100px] max-w-[120px] border border-gray-200 bg-gray-100 rounded rounded-xs shadow-lg sm:hidden">
            <Link
              href="/signup"
              className={`transition bg-gray-100 rounded hover:border hover:border-white hover:text-white w-full h-full py-1 px-2 font-normal hover:bg-indigo-700 ${
                path === "/signup" ? "bg-indigo-700 text-white" : ""
              }`}
            >
              Signup
            </Link>

            <Link
              href="/login"
              className={`transition bg-gray-100 rounded hover:border hover:border-white hover:text-white w-full h-full py-1 px-2 font-normal hover:bg-indigo-700 ${
                path === "/login" ? "bg-indigo-700 text-white" : ""
              }`}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <nav className="bg-indigo-600 py-3 px-2 sm:px-4 fixed top-0 left-0 w-full z-50">
      {isAccessTokenExpired ? (
        notAuthenticated
      ) : (
        <Authenticated
          setToggleMenu={setToggleMenu}
          toggleMenu={toggleMenu}
          path={path}
          toggleUser={toggleUser}
          setToggleUser={setToggleUser}
          handleSettings={handleSettings}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
