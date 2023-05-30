import React from "react";
import { useParams } from "react-router-dom";

import userAVI from "../../images/User-avatar.svg.png";
import Profile from "../../components/Profile";

const TechProfileScreen = () => {
  const clickedUser = {
    id: 1,
    displayName: "John Smith",
    email: "tugrp@example.com",
    phone: "123456879",
    location: "New York",
    category: "Electrician",
    rating: "4.5",
    experience: "4 Years",
    avatar: userAVI,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  };

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        <h1 className="text-4xl text-center font-bold mb-4">
          Technician Profile
        </h1>

        <Profile user={clickedUser} />
      </div>
    </section>
  );
};

export default TechProfileScreen;
