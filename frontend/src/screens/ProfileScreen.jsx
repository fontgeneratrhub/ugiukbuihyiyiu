import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import EditProfile from "../components/EditProfile";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Profile from "../components/Profile";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, error: userError, userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const {
    loading: adminLoading,
    error: adminError,
    adminUserInfo,
  } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const {
    loading: techLoading,
    error: techError,
    techUserInfo,
  } = technicianUserLogin;

  const adminUserUpdateProfile = useSelector(
    (state) => state.adminUserUpdateProfile
  );
  const { success: adminUpdateSuccess } = adminUserUpdateProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: userUpdateSuccess } = userUpdateProfile;

  const technicianUserUpdateProfile = useSelector(
    (state) => state.technicianUserUpdateProfile
  );
  const { success: techUpdateSuccess } = technicianUserUpdateProfile;

  const successMessage = (userUpdateSuccess ||
    adminUpdateSuccess ||
    techUpdateSuccess) && {
    status: "200",
    message: "Updated Successfully!",
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userInfo && !adminUserInfo && !techUserInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo, adminUserInfo, techUserInfo]);

  let user = null;
  let userType = null;

  if (userInfo) {
    user = userInfo.user;
    userType = "user";
  } else if (adminUserInfo) {
    user = adminUserInfo.user;
    userType = "admin";
  } else if (techUserInfo) {
    user = techUserInfo.user;
    userType = "technician";
  }
  if (!adminUserInfo && !userInfo && !techUserInfo) {
    return null;
  }

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        {userLoading || adminLoading || techLoading ? (
          <Loader />
        ) : userError || adminError || techError ? (
          <Message>{userError || adminError || techError}</Message>
        ) : (
          <>
            <h1 className="text-4xl text-center font-bold mb-4">
              User Profile
            </h1>
            {(userUpdateSuccess || adminUpdateSuccess || techUpdateSuccess) && (
              <Message>{successMessage}</Message>
            )}
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
              <EditProfile
                user={user}
                setIsEditing={setIsEditing}
                userType={userType}
              />
            ) : (
              <Profile user={user} userType={userType} />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileScreen;
