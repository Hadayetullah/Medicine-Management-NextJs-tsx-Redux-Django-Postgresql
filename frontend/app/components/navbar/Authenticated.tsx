import Link from "next/link";
import React from "react";

interface AuthenticatedProps {
  setToggleMenu: (toggleMenu: boolean) => void;
  toggleMenu: boolean;
  path: string;
  toggleUser: boolean;
  setToggleUser: (toggleUser: boolean) => void;
  handleSettings: () => void;
  handleLogout: () => void;
}

const Authenticated: React.FC<AuthenticatedProps> = ({
  setToggleMenu,
  toggleMenu,
  path,
  toggleUser,
  setToggleUser,
  handleSettings,
  handleLogout,
}) => {
  return (
    <div className="container mx-auto max-w-[1400px] flex items-center flex-row justify-between">
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

          <ul className="hidden flex-row w-full justify-start sm:justify-end sm:flex text-white space-x-2">
            <li className="flex items-center justify-center">
              <Link
                href="/"
                className={`hover:bg-indigo-700 py-1 px-2 rounded-md ${
                  path === "/" ? "bg-indigo-700" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>

            <li className="flex items-center justify-center">
              <Link
                href="/add-medicine"
                className={`hover:bg-indigo-700 py-1 px-2 rounded-md ${
                  path === "/add-medicine" ? "bg-indigo-700" : ""
                }`}
              >
                Add Medicine
              </Link>
            </li>
          </ul>

          {toggleMenu && (
            <div className="flex flex-col w-full absolute left-0 top-9 bg-white min-w-[120px] max-w-[150px] border border-gray-200 bg-gray-100 rounded rounded-xs shadow-lg sm:hidden">
              <Link
                href="/"
                className={`transition bg-gray-100 rounded hover:text-white hover:text-white w-full h-full py-1 px-2 font-normal hover:bg-indigo-700 ${
                  path === "/" ? "bg-indigo-700 text-white" : ""
                }`}
              >
                Dashboard
              </Link>

              <Link
                href="/add-medicine"
                className={`transition bg-gray-100 rounded hover:text-white hover:text-white w-full h-full py-1 px-2 font-normal hover:bg-indigo-700 ${
                  path === "/add-medicine" ? "bg-indigo-700 text-white" : ""
                }`}
              >
                Add Medicine
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 text-white ml-7 cursor-pointer"
          onClick={() => setToggleUser(!toggleUser)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        {toggleUser && (
          <div className="flex flex-col w-full absolute right-0 top-10 bg-white min-w-[120px] max-w-[150px] border border-gray-200 bg-gray-100 rounded rounded-xs shadow-lg">
            <button
              onClick={() => handleSettings()}
              className="transition bg-gray-100 rounded hover:border hover:border-white hover:text-white w-full h-full py-2 px-2 text-left font-normal hover:bg-indigo-700"
            >
              Settings
            </button>
            <button
              onClick={() => handleLogout()}
              className="transition bg-gray-100 rounded hover:border hover:border-white hover:text-white w-full h-full py-2 px-2 text-left font-normal hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authenticated;
