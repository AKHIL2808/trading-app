// "use client";
//
// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import SearchResultElemet from "./SearchResultElement";
//
// export default function SearchBar({ datas }) {
//   const [visible, setVisible] = useState(false);
//   const [relevantData, setRelevantData] = useState(datas);
//   // console.log(visible); // Logs the visibility state for debugging
//   console.log(datas)
//   return (
//     <div className="grid grid-rows-2">
//       <div
//         onFocus={() => setVisible(true)}
//         onBlur={() => setVisible(false)}
//         className="bg-background-tile/100 flex justify-center items-center h-10 w-72 rounded-xl focus-within:border focus-within:border-radium-blue focus-within:outline-radium-blue"
//         tabIndex={-1} // Make the div focusable
//       >
//         <FaSearch className="m-1" />
//         <input
//           type="search"
//           placeholder="Search Coins..."
//           className="bg-transparent p-1 m-1 focus:border-transparent focus:outline-none"
//         />
//       </div>
//       <div>
//         <SearchResultElemet datas={relevantData} visibility={visible} />
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // Use correct hooks
import { FaSearch } from "react-icons/fa";
import SearchResultElemet from "./SearchResultElement";

export default function InputComponent({ datas }) {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null); // Ref for the input element
  const pathname = usePathname(); // Track the current path

  const filteredData = datas.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close the dropdown and remove focus when the path changes
  useEffect(() => {
    setVisible(false);
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from the input
    }
  }, [pathname]);

  return (
    <div
      className="relative w-3/4 flex flex-col items-center"
      onBlur={(e) => {
        // Keep dropdown open if the new focus is inside the dropdown
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setVisible(false);
        }
      }}
      onFocus={() => setVisible(true)}
    >
      {/* Input Container */}
      <div className="w-72">
        <div className="bg-background-tile/100 flex justify-center items-center h-10 w-72 rounded-xl focus-within:border focus-within:border-radium-blue focus-within:outline-radium-blue">
          <FaSearch className="m-1" />
          <input
            type="search"
            placeholder="Search Coins..."
            className="bg-transparent p-1 m-1 focus:border-transparent focus:outline-none"
            value={searchTerm}
            ref={inputRef} // Attach ref to the input element
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Search Results */}
      {visible && filteredData.length > 0 && (
        <div
          className="absolute grid top-12 w-[100%] bg-background-tile/100 border border-gray-600/50 backdrop-blur-md rounded-lg shadow-background-tile-top/100 "
          onMouseDown={(e) => {
            // Prevent blur when clicking inside the dropdown
            e.preventDefault();
          }}
        >
          <SearchResultElemet datas={filteredData} />
        </div>
      )}
    </div>
  );
}
