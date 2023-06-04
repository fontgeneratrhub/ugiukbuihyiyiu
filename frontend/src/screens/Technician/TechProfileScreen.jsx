import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getTechnicianDetails } from "../../redux/actions/technicianActions.js";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Profile from "../../components/Profile";

const TechProfileScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechnicianDetails(id));
  }, [dispatch, id]);

  const technicianDetails = useSelector((state) => state.technicianDetails);
  const { loading, error, techUser } = technicianDetails;

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
          <Profile user={techUser} userType="technician" />
        )}
      </div>
    </section>
  );
};

export default TechProfileScreen;
