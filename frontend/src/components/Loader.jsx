import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <i className="fas fa-screwdriver-wrench fa-spin text-gray-500 mr-2"></i>
      <span className="text-gray-500">Loading...</span>
    </div>
  );
};

export default Loader;
