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
    <form onSubmit={handleSearch} className="w-3/4">
      <div className="flex flex-col sm:flex-row items-center">
        <input
          type="text"
          name="search"
          placeholder="Search for a Technician..."
          className="bg-gray-600 border-0 sm:rounded-l-md sm:rounded-r-none rounded-md py-3 px-4 my-2 focus:outline-none focus:ring-0 flex-grow"
        />

        <select
          name="category"
          onChange={handleCategoryChange}
          className="bg-gray-600 border-0 sm:border border-gray-500 rounded-md sm:rounded-none py-3 px-4 my-2 focus:outline-none"
        >
          <option
            className="text-gray-500 bg-white hover:bg-gray-700 px-3 py-2 rounded-md text-base hover:font-bold"
            value=""
          >
            All Categories
          </option>
          {categories.map((category) => (
            <option
              className="text-gray-500 bg-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base hover:font-bold"
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <Button
          variant="primary"
          type="submit"
          className="sm:rounded-r-md sm:rounded-l-none rounded-md"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
