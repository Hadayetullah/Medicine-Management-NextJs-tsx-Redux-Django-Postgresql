"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/app/actions/apiActions";
import { websocketEventEmitter } from "@/app/utils/websocketMiddlewareUtil";
import { setMessage } from "@/lib/features/productSlice";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

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

  return (
    <nav className="bg-indigo-600 py-3 px-2 sm:px-4 fixed top-0 left-0 w-full z-50">
      {isAccessTokenExpired ? (
        <UnAuthenticated
          setToggleMenu={setToggleMenu}
          toggleMenu={toggleMenu}
          path={path}
        />
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
