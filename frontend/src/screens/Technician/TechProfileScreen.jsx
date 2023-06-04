import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getTechnicianDetails } from "../../redux/actions/technicianActions.js";
import { createOrder } from "../../redux/actions/orderActions.js";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Profile from "../../components/Profile";

const TechProfileScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechnicianDetails(id));
  }, [dispatch, id]);

  const technicianDetails = useSelector((state) => state.technicianDetails);
  const { loading, error, techUser } = technicianDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, orderInfo } = orderCreate;

  const successMessage = {
    status: "200",
    message:
      "Order Created Successfully! You can Check your Orders in the Dashboard",
  };

  const handleBookTechncian = () => {
    const confirmed = window.confirm(
      "Are you sure you want to book this Technician?"
    );

    if (confirmed) {
      dispatch(createOrder(userInfo.user._id, techUser._id));
    }
  };

  // Check if the order was created for the current technician
  const isOrderCreatedForTechnician =
    success && orderInfo && orderInfo.technicianId === techUser._id;

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        <h1 className="text-4xl text-center font-bold mb-4">
          Technician Profile
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <div className="w-3/4 flex flex-row justify-between ">
              <Link to="/technicians">
                <Button variant="secondary" className="rounded-md mr-2">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Go Back
                </Button>
              </Link>
              {userInfo ? (
                <Button
                  variant="primary"
                  className="rounded-md"
                  onClick={handleBookTechncian}
                >
                  <i className="fas fa-user-check mr-2"></i>
                  Book Technician
                </Button>
              ) : null}
              {isOrderCreatedForTechnician && (
                <Button
                  variant="primary"
                  className="rounded-md"
                  onClick={() => navigate("/dashboard")}
                >
                  <i className="fas fa-gauge-high mr-2"></i>
                  Go to Dashboard
                </Button>
              )}
            </div>
            {isOrderCreatedForTechnician && <Message>{successMessage}</Message>}
            <Profile user={techUser} userType="technician" />
          </>
        )}
      </div>
    </section>
  );
};

export default TechProfileScreen;
