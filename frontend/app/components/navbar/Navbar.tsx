"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { disconnectWebSockets, logout } from "@/app/actions/apiActions";

import {
  resetProductSliceState,
  setMessage,
} from "@/lib/features/productSlice";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

const Navbar = () => {
  const { connectionDetails, connections, error } = useAppSelector(
    (state) => state.product
  );

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
      const connectionKeys = Object.keys(connections);
      connectionDetails.forEach((connection) => {
        const connectionName = connection.connectionKey;
        if (connectionKeys.includes(connectionName)) {
          dispatch(
            disconnectWebSockets({
              connectionKey: `${connectionName}`,
            })
          );
        }
      });

      dispatch(resetProductSliceState());
      setToggleUser(false);
      router.push("/login");
    } else {
      const connectionKeys = Object.keys(connections);
      connectionDetails.forEach((connection) => {
        const connectionName = connection.connectionKey;
        if (connectionKeys.includes(connectionName)) {
          dispatch(
            disconnectWebSockets({
              connectionKey: `${connectionName}`,
            })
          );
        }
      });
      dispatch(resetProductSliceState());
      setToggleUser(false);
      router.push("/login");
    }
  };

  const handleSettings = () => {
    setToggleUser(false);
    router.push("/settings");
  };

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
