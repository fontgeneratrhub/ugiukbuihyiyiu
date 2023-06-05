import React, { useState } from "react";

import Sidebar from "./SideBar";
import MainContent from "./MainContent";

const Dashboard = ({ variant }) => {
  const menuItems = {
    admin: [
      // {
      //   name: "Admins",
      //   icon: "fas fa-user",
      // },
      {
        name: "Technicians",
        icon: "fas fa-screwdriver-wrench",
      },
      {
        name: "Users",
        icon: "fas fa-users",
      },
      {
        name: "Orders",
        icon: "fas fa-clipboard-list",
      },
    ],
    technician: [
      {
        name: "Orders",
        icon: "fas fa-clipboard-list",
      },
      {
        name: "Reviews",
        icon: "fas fa-users",
      },
    ],
    user: [
      {
        name: "Orders",
        icon: "fas fa-clipboard-list",
      },
    ],
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <section className="min-h-screen flex flex-row bg-gray-800 text-white pt-16">
      <Sidebar
        variant={variant}
        menuItems={menuItems[variant]}
        selectedItem={selectedItem}
        handleItemClick={handleItemClick}
      />

      <MainContent
        variant={variant}
        selectedItem={selectedItem}
        menuItems={menuItems[variant]}
      />
    </section>
  );
};

export default Dashboard;
