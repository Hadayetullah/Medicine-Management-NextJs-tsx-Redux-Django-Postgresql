import React from "react";

interface SidebarProps {
  setHoldedListModal: (e: boolean) => void;
  setCustomerListModal: (e: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setHoldedListModal,
  setCustomerListModal,
}) => {
  return (
    <div className="pt-[65px] fixed left-0 flex flex-col shadow-lg shadow-black w-14 h-full bg-white items-center space-y-4 z-10">
      <button
        onClick={() => setHoldedListModal(true)}
        className="relative flex flex-row items-center group"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-9 h-9 text-gray-600 hover:text-gray-900"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"
          ></path>
        </svg>

        <div className="absolute left-12 flex flex-row items-center invisible group-hover:visible z-50">
          <span className="w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-r-gray-900 border-b-[10px] border-b-transparent"></span>
          <span className="border border-gray-900 bg-gray-900 text-white text-nowrap px-2 rounded-[5px]">
            Holded List
          </span>
        </div>
      </button>

      <button
        onClick={() => setCustomerListModal(true)}
        className="relative flex flex-row items-center group"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-9 h-9 text-gray-600 hover:text-gray-900"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 24"
          id="prescription"
        >
          <path
            fill="currentColor"
            d="m15.76 2.852h-2.577v1.221h2.577.007c.655 0 1.186.531 1.186 1.186v.008 16.326.007c0 .656-.532 1.187-1.187 1.187-.002 0-.005 0-.007 0h-13.351c-.002 0-.005 0-.007 0-.656 0-1.187-.532-1.187-1.187 0-.003 0-.005 0-.008v-16.326c0-.002 0-.005 0-.007 0-.656.532-1.187 1.187-1.187h.007 2.577v-1.22h-2.577c-1.331 0-2.411 1.08-2.411 2.411v16.326c.001 1.331 1.08 2.41 2.411 2.41h13.351c1.331 0 2.411-1.08 2.411-2.411v-16.326c0-1.331-1.08-2.411-2.411-2.411z"
          ></path>
          <path
            fill="currentColor"
            d="M12.605 2.225h-1.319c0-1.229-.996-2.225-2.225-2.225s-2.225.996-2.225 2.225h-1.31v3.057h7.073v-3.057zm-2.258 0h-2.57c0-.01 0-.021 0-.032 0-.71.576-1.286 1.286-1.286s1.286.576 1.286 1.286v.034-.002zM5.947 8.512h9.458v1.17h-9.458zM5.947 13.41h9.458v1.17h-9.458zM5.947 18.25h9.458v1.176h-9.458zM2.628 7.757h2.68v2.68h-2.68zM2.628 12.655h2.68v2.68h-2.68zM2.628 17.497h2.68v2.68h-2.68z"
          ></path>
        </svg>

        <div className="absolute left-12 flex flex-row items-center invisible group-hover:visible z-50">
          <span className="w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-r-gray-900 border-b-[10px] border-b-transparent"></span>
          <span className="border border-gray-900 bg-gray-900 text-white text-nowrap px-2 rounded-[5px]">
            Prescriptions List
          </span>
        </div>
      </button>

      <button className="cursor-not-allowed relative flex flex-row items-center group">
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-9 h-9 text-gray-600 hover:text-gray-900"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          ></path>
        </svg>

        <div className="absolute left-12 flex flex-row items-center invisible group-hover:visible z-50">
          <span className="w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-r-gray-900 border-b-[10px] border-b-transparent"></span>
          <span className="border border-gray-900 bg-gray-900 text-white text-nowrap px-2 rounded-[5px]">
            Take Notes
          </span>
        </div>
      </button>

      <button className="cursor-not-allowed relative flex flex-row items-center group">
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-9 h-9 text-gray-600 hover:text-gray-900"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
          ></path>
        </svg>

        <div className="absolute left-12 flex flex-row items-center invisible group-hover:visible z-50">
          <span className="w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-r-gray-900 border-b-[10px] border-b-transparent"></span>
          <span className="border border-gray-900 bg-gray-900 text-white text-nowrap px-2 rounded-[5px]">
            Shipping Details
          </span>
        </div>
      </button>

      <button className="cursor-not-allowed relative flex flex-row items-center group">
        <svg
          aria-hidden="true"
          focusable="false"
          className="w-9 h-9 text-gray-600 hover:text-gray-900"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
          ></path>
        </svg>

        <div className="absolute left-12 flex flex-row items-center invisible group-hover:visible z-50">
          <span className="w-0 h-0 border-t-[10px] border-t-transparent border-r-[20px] border-r-gray-900 border-b-[10px] border-b-transparent"></span>
          <span className="border border-gray-900 bg-gray-900 text-white text-nowrap px-2 rounded-[5px]">
            Settings
          </span>
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
