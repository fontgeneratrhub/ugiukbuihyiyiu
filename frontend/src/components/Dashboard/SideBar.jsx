import React from "react";

import userAVI from "../../images/User-avatar.svg.png";

const SideBar = ({ menuItems, selectedItem, handleItemClick }) => {
  const handleClick = (index, name) => {
    handleItemClick(index);

    // Use REdux to Compare
  };
  return (
    <div className="min-h-screen w-1/6 bg-gray-900 flex flex-col items-center shadow-md p-4">
      <div className="flex flex-col items-center  mb-4">
        <img
          className="w-full rounded-full mr-3"
          src={userAVI}
          alt="User Avatar"
        />
        <h2 className="text-white text-xl font-semibold mb-2 hidden md:block">
          Jane Doe
        </h2>
      </div>

      <h2 className="text-xl font-semibold mb-4 flex flex-row items-center">
        <i className="fas fa-gauge-high mr-2"></i>
        <span className="hidden md:block">Dashboard</span>
      </h2>

      <nav className="text-sm">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-3">
              <button
                onClick={() => handleButtonClick(index, item.name)}
                className={`flex flex-row items-center ${
                  selectedItem === index ? "text-white" : "text-gray-400"
                } hover:text-white`}
              >
                <i className={`${item.icon} mr-2`}></i>
                <span className="hidden md:block">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
