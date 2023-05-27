import React, { useState } from "react";

import Sidebar from "./SideBar";
import MainContent from "./MainContent";

const Dashboard = ({ variant }) => {
  const menuItems = {
    admin: [
      {
        name: "Profile",
        icon: "fas fa-address-card",
        link: "/admin/profile",
      },
      {
        name: "Admins",
        icon: "fas fa-user",
        link: "/admin/admins",
      },
      {
        name: "Technicians",
        icon: "fas fa-screwdriver-wrench",
        link: "/admin/technicians",
      },
      {
        name: "Users",
        icon: "fas fa-users",
        link: "/admin/users",
      },
      {
        name: "Orders",
        icon: "fas fa-clipboard-list",
        link: "/admin/tickets",
      },
    ],
    technician: [
      {
        name: "Profile",
        icon: "fas fa-address-card",
        link: "/technician/profile",
      },
      {
        name: "Orders",
        icon: "fas fa-clipboard-list",
        link: "/technician/tickets",
      },
      {
        name: "Reviews",
        icon: "fas fa-users",
        link: "/technician/reviews",
      },
    ],
    user: [
      {
        name: "Profile",
        icon: "fas fa-address-card",
        link: "/user/profile",
      },
      {
        name: "Orders",
        icon: "fas fa-clipboard-list",
        link: "/user/tickets",
      },
      {
        name: "Reviews",
        icon: "fas fa-users",
        link: "/user/reviews",
      },
    ],
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white pt-16">
      <Sidebar
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
