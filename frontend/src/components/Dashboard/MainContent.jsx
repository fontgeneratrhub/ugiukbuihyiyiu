import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteUser, listUsers } from "../../redux/actions/userActions";
import {
  technicianDelete,
  listTechnicians,
} from "../../redux/actions/technicianActions";

import Loader from "../../components/Loader";
import Message from "../../components/Message.jsx";
import Table from "../Table";

const MainContent = ({ variant, selectedItem, menuItems }) => {
  const userColumns = ["name", "_id", "email"];
  // const adminColumns = ["name", "_id", "email"];
  const technicianColumns = ["name", "_id", "email"];
  // const orderColumns = ["orderId", "customerId", "status"];

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  let loggedInUserName = "";
  let userType = "";

  if (adminUserInfo && variant === "admin") {
    loggedInUserName = adminUserInfo.user.name;
    userType = "Admin";
  } else if (techUserInfo && variant === "technician") {
    loggedInUserName = techUserInfo.user.name;
    userType = "Technician";
  } else if (userInfo && variant === "user") {
    loggedInUserName = userInfo.user.name;
    userType = "User";
  }

  const formattedUserName =
    loggedInUserName.charAt(0).toUpperCase() + loggedInUserName.slice(1);

  const userList = useSelector((state) => state.userList);
  const { loading: usersLoading, error: usersError, users } = userList;

  const technicianUserList = useSelector((state) => state.technicianUserList);
  const {
    loading: technicianUsersLoading,
    error: technicianUsersError,
    technicians,
  } = technicianUserList;

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteUser(userId)).then(() => {
        dispatch(listUsers(adminUserInfo.user._id));
      });
    }
  };

  const handleDeleteTechnician = (technicianId) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(technicianDelete(technicianId)).then(() => {
        dispatch(listTechnicians());
      });
    }
  };

  return (
    <div className="min-h-screen w-10/12 bg-gradient-to-br from-gray-800 to-gray-700 p-4">
      {/* Main content */}
      <h1 className="text-4xl text-center font-bold">
        Welcome {formattedUserName}!
      </h1>
      {userType && (
        <h2
          className={`text-lg text-center font-semibold mb-4 ${
            userType === "Admin" && "text-red-500"
          } ${userType === "Technician" && "text-yellow-500"} ${
            userType === "User" && "text-green-500"
          }`}
        >
          User Type: {userType}
        </h2>
      )}

      {selectedItem !== null && (
        <div>
          {/* {menuItems[selectedItem].name === "Admins" && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Admins</h2>
                {admins.map((admin) => (
                  <div key={admin.id}>{admin.name}</div>
                ))}
              </div>
            )} */}
          {menuItems[selectedItem].name === "Technicians" && technicians && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">All Technicians</h2>
              {technicianUsersLoading ? (
                <Loader />
              ) : technicianUsersError ? (
                <Message variant="error">{technicianUsersError}</Message>
              ) : (
                <Table
                  data={technicians}
                  columns={technicianColumns}
                  handleDelete={handleDeleteTechnician}
                  entityType="technician"
                />
              )}
            </div>
          )}

          {menuItems[selectedItem].name === "Users" && users && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">All Users</h2>
              {usersLoading ? (
                <Loader />
              ) : usersError ? (
                <Message variant="error">{usersError}</Message>
              ) : (
                <Table
                  data={users}
                  columns={userColumns}
                  handleDelete={handleDeleteUser}
                  entityType="user"
                />
              )}
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
