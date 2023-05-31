import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <i className="fas fa-screwdriver-wrench fa-spin text-6xl text-gray-500 mb-4"></i>
      <span className="text-gray-500 text-2xl">Loading...</span>
    </div>
  );
};

export default Loader;
