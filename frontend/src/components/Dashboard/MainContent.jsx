import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteFeedback,
  listAllFeedbacks,
  listTechnicianFeedbacks,
} from "../../redux/actions/feedBackActions.js";
import {
  deleteOrder,
  listAllOrders,
  listTechnicianOrders,
  listUserOrders,
  updateOrderStatus,
} from "../../redux/actions/orderActions.js";
import {
  listTechnicians,
  technicianDelete,
} from "../../redux/actions/technicianActions.js";
import { deleteUser, listUsers } from "../../redux/actions/userActions.js";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FeedbackTable from "../FeedbackTable";
import OrderTable from "../OrderTable";
import SubscriptionCard from "../SupscriptionCard.jsx";
import Table from "../Table";

const MainContent = ({ variant, selectedItem, menuItems }) => {
  let classes;
  switch (variant) {
    case "admin":
      classes = "bg-gradient-to-br from-indigo-800 to-indigo-700";
      break;
    case "technician":
      classes = "bg-gradient-to-br from-sky-800 to-sky-700";
      break;
    case "user":
      classes = "bg-gradient-to-br from-gray-800 to-gray-700";
      break;
    default:
      classes = "bg-gradient-to-br from-gray-800 to-gray-700";
  }

  const userColumns = ["name", "_id", "email"];
  // const adminColumns = ["name", "_id", "email"];
  const technicianColumns = ["name", "_id", "email"];
  const orderColumns = [
    "_id",
    "userName",
    "technicianName",
    "createdAt",
    "status",
  ];
  const feedbackColumns = [
    "_id",
    "userName",
    "technicianName",
    "stars",
    "description",
    "createdAt",
  ];

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: deleteError, success: deleteSuccess } = userDelete;

  const technicianUserDelete = useSelector(
    (state) => state.technicianUserDelete
  );
  const { error: technicianDeleteError, success: technicianDeleteSuccess } =
    technicianUserDelete;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { error: orderDeleteError, success: orderDeleteSuccess } = orderDelete;

  const orderStatusUpdate = useSelector((state) => state.orderStatusUpdate);
  const { error: orderStatusUpdateError, success: orderStatusUpdateSuccess } =
    orderStatusUpdate;

  const feedbackDelete = useSelector((state) => state.feedbackDelete);
  const { error: feedbackDeleteError, success: feedbackDeleteSuccess } =
    feedbackDelete;

  const feedbackUpdate = useSelector((state) => state.feedbackUpdate);
  const { error: feedbackUpdateError, success: feedbackUpdateSuccess } =
    feedbackUpdate;

  const successMessage = (deleteSuccess ||
    technicianDeleteSuccess ||
    orderDeleteSuccess ||
    feedbackDeleteSuccess) && {
    status: "200",
    message: "Deleted Successfully!",
  };

  const updateSuccessMessage = (orderStatusUpdateSuccess ||
    feedbackUpdateSuccess) && {
    status: "200",
    message: "Updated Successfully!",
  };

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

  const orderListAll = useSelector((state) => state.orderListAll);
  const {
    loading: allOrdersLoading,
    error: allOrdersError,
    allOrders,
  } = orderListAll;

  const orderListUser = useSelector((state) => state.orderListUser);
  const {
    loading: ordersLoading,
    error: ordersError,
    userOrders,
  } = orderListUser;

  const orderListTechnician = useSelector((state) => state.orderListTechnician);
  const {
    loading: technicianOrdersLoading,
    error: technicianOrdersError,
    technicianOrders,
  } = orderListTechnician;

  const feedbackListAll = useSelector((state) => state.feedbackListAll);
  const {
    loading: allFeedbacksLoading,
    error: allFeedbacksError,
    allFeedbacks,
  } = feedbackListAll;

  const feedbackListTechnician = useSelector(
    (state) => state.feedbackListTechnician
  );
  const {
    loading: technicianFeedbacksLoading,
    error: technicianFeedbacksError,
    technicianFeedbacks,
  } = feedbackListTechnician;

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

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteOrder(orderId)).then(() => {
        if (variant === "admin") {
          dispatch(listAllOrders(adminUserInfo.user._id));
        }
        if (variant === "user") {
          dispatch(listUserOrders(userInfo.user._id));
        }
        if (variant === "technician") {
          dispatch(listTechnicianOrders(techUserInfo.user._id));
        }
      });
    }
  };

  const handleStatusOrder = (orderId) => {
    if (window.confirm("Are You Sure?")) {
      const orders =
        variant === "admin"
          ? allOrders
          : variant === "user"
          ? userOrders
          : technicianOrders;

      const status = orders.find((order) => order._id === orderId).status;

      const newStatus = status === "Pending" ? "Done" : status;

      dispatch(updateOrderStatus(orderId, newStatus)).then(() => {
        if (variant === "admin") {
          dispatch(listAllOrders(adminUserInfo.user._id));
        }
        if (variant === "user") {
          dispatch(listUserOrders(userInfo.user._id));
        }
        if (variant === "technician") {
          dispatch(listTechnicianOrders(techUserInfo.user._id));
        }
      });
    }
  };

  const handleDeleteFeedback = (feedbackId) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteFeedback(feedbackId)).then(() => {
        if (variant === "admin") {
          dispatch(listAllFeedbacks(adminUserInfo.user._id));
        }
        if (variant === "technician") {
          dispatch(listTechnicianFeedbacks(techUserInfo.user._id));
        }
      });
    }
  };

  // const handleUpdateFeedback = (feedbackId) => {
  //   if (window.confirm("Are You Sure?")) {
  //     dispatch(updateFeedback(feedbackId)).then(() => {
  //       if (variant === "admin") {
  //         dispatch(listAllFeedbacks(adminUserInfo.user._id));
  //       }
  //       if (variant === "technician") {
  //         dispatch(listTechnicianFeedbacks(techUserInfo.user._id));
  //       }
  //     });
  //   }
  // };

  return (
    <div className={`${classes} min-h-screen w-10/12 p-4`}>
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

      {(deleteSuccess ||
        technicianDeleteSuccess ||
        orderDeleteSuccess ||
        feedbackDeleteSuccess) && <Message>{successMessage}</Message>}
      {(orderStatusUpdateSuccess || feedbackUpdateSuccess) && (
        <Message>{updateSuccessMessage}</Message>
      )}
      {orderStatusUpdateError && <Message>{orderStatusUpdateError}</Message>}
      {deleteError && <Message>{deleteError}</Message>}
      {technicianDeleteError && <Message>{technicianDeleteError}</Message>}
      {orderDeleteError && <Message>{orderDeleteError}</Message>}
      {feedbackDeleteError && <Message>{feedbackDeleteError}</Message>}
      {feedbackUpdateError && <Message>{feedbackUpdateError}</Message>}

      {techUserInfo && !techUserInfo.user.subscription ? (
        <div className="flex flex-col sm:flex-row justify-evenly items-center">
          <SubscriptionCard
            plan="Monthly Plan"
            price="1500"
            subscriptionStatus={techUserInfo.user.subscription}
          />
        </div>
      ) : null}

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
                <Message>{technicianUsersError}</Message>
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
                <Message>{usersError}</Message>
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
              {variant === "admin" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">All Orders</h3>
                  {allOrdersLoading ? (
                    <Loader />
                  ) : allOrdersError ? (
                    <Message>{allOrdersError}</Message>
                  ) : (
                    <OrderTable
                      data={allOrders}
                      columns={orderColumns}
                      handleDelete={handleDeleteOrder}
                      handleStatus={handleStatusOrder}
                      entityType="admin"
                    />
                  )}
                </div>
              )}

              {variant === "user" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Orders</h3>
                  {ordersLoading ? (
                    <Loader />
                  ) : ordersError ? (
                    <Message variant="error">{ordersError}</Message>
                  ) : (
                    <OrderTable
                      data={userOrders}
                      columns={orderColumns}
                      handleDelete={handleDeleteOrder}
                      handleStatus={handleStatusOrder}
                      entityType="user"
                    />
                  )}
                </div>
              )}

              {variant === "technician" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Your Assigned Orders
                  </h3>
                  {technicianOrdersLoading ? (
                    <Loader />
                  ) : technicianOrdersError ? (
                    <Message variant="error">{technicianOrdersError}</Message>
                  ) : (
                    <OrderTable
                      data={technicianOrders}
                      columns={orderColumns}
                      handleDelete={handleDeleteOrder}
                      handleStatus={handleStatusOrder}
                      entityType="technician"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {menuItems[selectedItem].name === "Reviews" && (
            <div>
              {variant === "admin" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">All Reviews</h3>
                  {allFeedbacksLoading ? (
                    <Loader />
                  ) : allFeedbacksError ? (
                    <Message>{allFeedbacksError}</Message>
                  ) : (
                    <FeedbackTable
                      data={allFeedbacks}
                      columns={feedbackColumns}
                      handleDelete={handleDeleteFeedback}
                      entityType="admin"
                    />
                  )}
                </div>
              )}

              {variant === "technician" && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Reviews</h3>
                  {technicianFeedbacksLoading ? (
                    <Loader />
                  ) : technicianFeedbacksError ? (
                    <Message>{technicianFeedbacksError}</Message>
                  ) : (
                    <FeedbackTable
                      data={technicianFeedbacks}
                      columns={feedbackColumns}
                      handleDelete={handleDeleteFeedback}
                      entityType="technician"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent;
