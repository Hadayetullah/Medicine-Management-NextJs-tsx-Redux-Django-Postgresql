import Link from "next/link";
import React from "react";

interface UnAuthenticatedProps {
  setToggleMenu: (toggleMenu: boolean) => void;
  toggleMenu: boolean;
  path: string;
}

const UnAuthenticated: React.FC<UnAuthenticatedProps> = ({
  setToggleMenu,
  toggleMenu,
  path,
}) => {
  return (
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
};

export default UnAuthenticated;
