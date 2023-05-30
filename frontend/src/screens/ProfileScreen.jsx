import React, { useState } from "react";
import Profile from "../components/Profile";
import avi from "../images/User-avatar.svg.png";
import Button from "../components/Button";
import EditProfile from "../components/EditProfile";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    id: 1,
    displayName: "John Smith",
    email: "tugrp@example.com",
    phone: "123456879",
    location: "New York",
    category: "Electrician",
    rating: "4.5",
    experience: "4 Years",
    avatar: avi,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    isTechnician: true,
  };

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        <h1 className="text-4xl text-center font-bold mb-4">User Profile</h1>
        <Button
          variant="success"
          className={`${isEditing ? "hidden" : "block"} rounded-md mb-4`}
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          Edit Profile
        </Button>
        {isEditing ? (
          <EditProfile user={userInfo} setIsEditing={setIsEditing} />
        ) : (
          <Profile user={userInfo} />
        )}
      </div>
    </section>
  );
};

export default ProfileScreen;
