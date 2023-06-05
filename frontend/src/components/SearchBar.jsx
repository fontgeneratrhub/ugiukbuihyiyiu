import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listTechnicianCategories } from "../redux/actions/technicianActions";

import Button from "./Button";

const SearchBar = ({ onSearch, onCategoryChange }) => {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchText = event.target.elements.search.value;
    onSearch(searchText);
  };

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listTechnicianCategories());
  }, [dispatch]);

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
          placeholder="Enter Location or Name for a Technician..."
          className="bg-gray-600 border-0 sm:rounded-l-md sm:rounded-r-none rounded-md py-3 px-4 my-2 focus:outline-none focus:ring-0 flex-grow"
        />

        <div>
          <select
            id="category"
            name="category"
            onChange={handleCategoryChange}
            className="bg-gray-600 border-0 sm:border border-gray-500 rounded-md sm:rounded-none py-3 px-4 my-2 focus:outline-none"
          >
            <option value="">All Categories</option>
            {loading ? (
              <option>Loading...</option>
            ) : error ? (
              <option>Error: {error}</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))
            )}
          </select>
        </div>

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
