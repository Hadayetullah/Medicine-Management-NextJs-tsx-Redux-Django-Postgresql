"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="bg-indigo-600 py-4 px-2 sm:px-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center flex-row justify-between">
        <div className="flex items-center justify-evenly w-full flex-row-reverse sm:flex-row sm:justify-between">
          <div className="w-full flex items-left sm:items-center pl-[6%] sm:pl-0">
            <Link href={"/"} className="text-white">
              LOGO
            </Link>
          </div>

          <div className="flex w-full relative">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-white flex cursor-pointer sm:hidden"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <ul className="hidden flex-row w-full space-x-6 justify-start sm:justify-end sm:flex">
              <li className="">
                <Link
                  href="/"
                  //   className={({ isActive }) =>
                  //     isActive
                  //       ? "text-white border-b-2 border-white"
                  //       : "text-white"
                  //   }
                >
                  Dashboard
                </Link>
              </li>

              <li className="">
                <Link
                  href="/project-overview"
                  //   className={({ isActive }) =>
                  //     isActive
                  //       ? "text-white border-b-2 border-white"
                  //       : "text-white"
                  //   }
                >
                  Project Overview
                </Link>
              </li>
            </ul>

            {toggleMenu && (
              <ul className="flex flex-col w-full absolute left-0 top-8 bg-white min-w-[140px] max-w-[170px] border border-gray-200 bg-gray-100 rounded rounded-xs shadow-lg sm:hidden">
                <li className="transition bg-gray-100 p-2 hover:bg-blue-500 rounded hover:border hover:border-white hover:text-white w-full h-full">
                  <Link
                    href="/"
                    // className={({ isActive }) =>
                    //   isActive ? "border-b-2 border-gray-400" : ""
                    // }
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="transition bg-gray-100 p-2 hover:bg-blue-500 rounded hover:border hover:border-white hover:text-white w-full h-full">
                  <Link
                    href="/project-overview"
                    // className={({ isActive }) =>
                    //   isActive ? "border-b-2 border-gray-400" : ""
                    // }
                  >
                    Project Overview
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-white ml-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
