import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getTechnicianDetails } from "../../redux/actions/technicianActions.js";
import { createOrder } from "../../redux/actions/orderActions.js";
import {
  listTechnicianFeedbacks,
  createFeedback,
} from "../../redux/actions/feedBackActions.js";
import { FEEDBACK_CREATE_RESET } from "../../redux/constants/feedBackConstants.js";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Profile from "../../components/Profile";

const TechProfileScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);

  useEffect(() => {
    dispatch(getTechnicianDetails(id));
  }, [dispatch, id]);

  const technicianDetails = useSelector((state) => state.technicianDetails);
  const { loading, error, techUser } = technicianDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success, orderInfo } = orderCreate;

  const feedbackCreate = useSelector((state) => state.feedbackCreate);
  const {
    loading: feedbackLoading,
    error: feedbackError,
    success: feedbackSuccess,
    feedbackInfo,
  } = feedbackCreate;

  const feedbackListTechnician = useSelector(
    (state) => state.feedbackListTechnician
  );
  const {
    loading: feedbackListLoading,
    error: feedbackListError,
    technicianFeedbacks,
  } = feedbackListTechnician;

  const successMessage = {
    status: "200",
    message:
      "Order Created Successfully! You can Check your Orders in the Dashboard",
  };
  const successFeedMessage = {
    status: "200",
    message: "Feedback Submitted Successfully!",
  };

  // Create feedback for the technician

  const handleBookTechncian = () => {
    const confirmed = window.confirm(
      "Are you sure you want to book this Technician?"
    );

    if (confirmed) {
      dispatch(createOrder(userInfo.user._id, techUser._id));
    }
  };

  useEffect(() => {
    if (feedbackSuccess) {
      setStars(0);
      setDescription("");
      dispatch({ type: FEEDBACK_CREATE_RESET });
    }
    dispatch(listTechnicianFeedbacks(id));
    dispatch(getTechnicianDetails(id));
  }, [dispatch, feedbackSuccess, id]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to review this Technician?"
    );

    if (confirmed) {
      dispatch(createFeedback(userInfo.user._id, id, description, stars));
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
        {loading || feedbackLoading || feedbackListLoading ? (
          <Loader />
        ) : error || feedbackError || feedbackListError ? (
          <Message>{error || feedbackError || feedbackListError}</Message>
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
            <div className="w-full flex flex-col sm:flex-row justify-center items-center mb-4 sm:m-2 px-6 py-2 ">
              <Profile user={techUser} userType="technician" />
              {technicianFeedbacks && technicianFeedbacks.length > 0 && (
                <div className="w-full sm:w-10/12 bg-gray-700 rounded-lg shadow-lg sm:m-2 p-4">
                  <h1 className="text-2xl font-bold mb-4 text-white">
                    Feedbacks
                  </h1>
                  {technicianFeedbacks.map((feedback) => (
                    <div
                      key={feedback._id}
                      className="bg-gray-800 rounded-lg shadow-lg mb-4 p-4 hover:border-2 hover:border-gray-900 "
                    >
                      <div className="flex justify-between">
                        <h1 className="text-xl font-bold text-white">
                          {feedback.userName}
                        </h1>
                        <div className="flex items-center">
                          {Array.from(
                            Array(parseInt(feedback.stars)),
                            (_, index) => (
                              <i
                                key={index}
                                className="fas fa-star text-yellow-400 mr-1"
                              ></i>
                            )
                          )}
                        </div>
                      </div>
                      <p className="text-lg text-white">
                        {feedback.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {userInfo ? (
              <div className="w-full sm:w-10/12 bg-gray-700 rounded-lg shadow-lg mb-4 sm:m-2 p-6">
                <h1 className="text-2xl font-bold mb-4 text-white">
                  Give Feedback
                </h1>
                <form onSubmit={handleFeedbackSubmit} className="w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="stars"
                      className="block text-white text-lg font-bold mb-2"
                    >
                      Rating
                    </label>
                    <select
                      id="stars"
                      value={stars}
                      onChange={(e) => setStars(e.target.value)}
                      className="bg-gray-800 border-0 sm:border border-gray-500 rounded-md py-3 px-4 my-2 focus:outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block text-white">
                      Comment
                    </label>
                    <textarea
                      id="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                    ></textarea>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="rounded-md"
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Submit
                  </Button>
                </form>
              </div>
            ) : (
              <Message>
                {{
                  status: 401,
                  message: "You need to login to give feedback",
                }}
              </Message>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TechProfileScreen;
