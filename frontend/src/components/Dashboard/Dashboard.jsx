import React, { useState } from "react";

import Sidebar from "./SideBar";
import MainContent from "./MainContent";

const Dashboard = ({ variant }) => {
  let classes;
  switch (variant) {
    case "admin":
      classes = "bg-indigo-900";
      break;
    case "technician":
      classes = "bg-sky-900";
      break;
    case "user":
      classes = "bg-gray-900";
      break;
    default:
      classes = "bg-gray-900";
  }
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
      {
        name: "Reviews",
        icon: "fas fa-users",
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
    <section
      className={`${classes} min-h-screen flex flex-row text-white pt-16`}
    >
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
