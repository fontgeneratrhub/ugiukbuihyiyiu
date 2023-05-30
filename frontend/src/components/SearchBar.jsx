import React from "react";
import Button from "./Button";

const SearchBar = ({ onSearch, onCategoryChange }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    const searchText = event.target.elements.search.value;
    onSearch(searchText);
  };

  const categories = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "Mason",
    "Welder",
    "Mechanic",
    "Technician",
  ];

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    onCategoryChange(category);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="flex items-center">
        <input
          type="text"
          name="search"
          placeholder="Search for a Technician..."
          className="px-4 py-2 rounded-md bg-gray-600 border-0 focus:outline-none focus:ring-0 flex-grow"
        />

        <select
          name="category"
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-md bg-gray-600 border-0 focus:outline-none appearance-none cursor-pointer ml-2"
        >
          <option
            className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base hover:font-bold"
            value=""
          >
            All Categories
          </option>
          {categories.map((category) => (
            <option
              className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base hover:font-bold"
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <Button variant="primary" type="submit" className="rounded-md ml-2">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
