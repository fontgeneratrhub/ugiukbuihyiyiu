import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Button from "./Button";

const SortDropdown = ({ sortOptions, sortOption, handleSort }) => {
  const [dropIsOpen, setDropIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative flex justify-center" ref={dropdownRef}>
      <Button
        variant="secondary"
        onClick={() => setDropIsOpen(!dropIsOpen)}
        className="text-white rounded-md"
      >
        Sort Options: {sortOption}
      </Button>
      <div
        className={`${
          dropIsOpen ? "block" : "hidden"
        } origin-top absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div
          className="p-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {sortOptions.menuItems.map((option) => (
            <Link
              key={option.value}
              to={option.link}
              className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base hover:font-bold"
              role="menuitem"
              onClick={() => {
                handleSort(option.value);
                setDropIsOpen(false);
              }}
            >
              <i className={`${option.icon} mr-2`}></i>
              {option.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
