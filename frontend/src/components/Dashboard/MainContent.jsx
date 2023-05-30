import React, { useState } from "react";

const MainContent = ({ variant, selectedItem, menuItems }) => {
  // const admins = useSelector((state) => state.admins);
  // const technicians = useSelector((state) => state.technicians);

  // const userList = useSelector((state) => state.userList);
  // const { loading, error, users } = userList;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const allOrders = useSelector((state) => state.allOrders);
  // const { loading, error, orders } = allOrders;

  return (
    <div className="min-h-screen w-10/12 bg-gradient-to-br from-gray-800 to-gray-700 p-4">
      {/* Main content */}
      <h1 className="text-4xl text-center font-bold mb-4">
        Welcome {variant.charAt(0).toUpperCase() + variant.slice(1)}!
      </h1>
      {selectedItem !== null && (
        <div>
          {menuItems[selectedItem].name === "Admins" && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Admins</h2>
              {admins.map((admin) => (
                <div key={admin.id}>{admin.name}</div>
              ))}
            </div>
          )}
          {menuItems[selectedItem].name === "Technicians" && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Technicians</h2>
              {technicians.map((technician) => (
                <div key={technician.id}>{technician.name}</div>
              ))}
            </div>
          )}
          {menuItems[selectedItem].name === "Users" && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Users</h2>
              {users.map((user) => (
                <div key={user.id}>{user.name}</div>
              ))}
            </div>
          )}
          {menuItems[selectedItem].name === "Orders" && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Orders</h2>
              {variant === "admin" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">All Orders</h3>
                  {allOrders.map((order) => (
                    <div key={order.id}>{order.name}</div>
                  ))}
                </div>
              )}
              {variant === "user" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Orders</h3>
                  {userOrders.map((order) => (
                    <div key={order.id}>{order.name}</div>
                  ))}
                </div>
              )}
              {variant === "technician" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Your Assigned Orders
                  </h3>
                  {technicianOrders.map((order) => (
                    <div key={order.id}>{order.name}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {menuItems[selectedItem].name === "Reviews" && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Users</h2>
              {users.map((user) => (
                <div key={user.id}>{user.name}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent;
