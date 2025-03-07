"use client";

interface SearchMedicinesProps {
  searchQuery: string;
  setSearchQuery: (e: string) => void;
}

const SearchMedicine: React.FC<SearchMedicinesProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleIconClick = () => {
    const input = document.getElementById("search-input");
    if (input) {
      input.focus();
    }
  };

  return (
    <div className="min-w-[100px] max-w-full h-[60px] flex justify-center mx-auto relative">
      <div className="w-full pl-14 border border-l-0 border-r-0 border-gray-500 shadow-lg text-2xl h-full">
        <input
          type="text"
          placeholder="Search by Medicine Name"
          value={searchQuery}
          className="w-full outline-none text-xl h-full"
          id="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div
        onClick={handleIconClick}
        className="absolute left-0 top-1 text-gray-700 cursor-text z-10 flex h-[56px] bg-white w-[50px] items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-10 ml-2">
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchMedicine;
