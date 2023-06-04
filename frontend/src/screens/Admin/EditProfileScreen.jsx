import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { getUserDetails } from "../../redux/actions/userActions";
import { getTechnicianDetails } from "../../redux/actions/technicianActions";

import { USER_DETAILS_RESET } from "../../redux/constants/userConstants";
import { TECHNICIAN_DETAILS_RESET } from "../../redux/constants/technicianConstants";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import EditProfile from "../../components/EditProfile";
import Button from "../../components/Button";

const EditProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUser,
    error: errorUser,
    user: userInfo,
  } = userDetails;

  const technicianDetails = useSelector((state) => state.technicianDetails);
  const {
    loading: loadingTechnician,
    error: errorTechnician,
    techUser: techUserInfo,
  } = technicianDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: userUpdateSuccess } = userUpdateProfile;

  const technicianUserUpdateProfile = useSelector(
    (state) => state.technicianUserUpdateProfile
  );
  const { success: techUpdateSuccess } = technicianUserUpdateProfile;

  useEffect(() => {
    if (!adminUserInfo) {
      navigate("/admin/login");
    } else {
      dispatch(getUserDetails(id));
      dispatch(getTechnicianDetails(id));
    }
  }, [dispatch, navigate, adminUserInfo, id]);

  const successMessage =
    (userUpdateSuccess || techUpdateSuccess) && "Updated Successfully!";

  let user = null;
  let userType = null;

  if (userInfo && userInfo._id === id) {
    user = userInfo;
    userType = "user";
  } else if (techUserInfo && techUserInfo._id === id) {
    user = techUserInfo;
    userType = "technician";
  }

  const handleBack = () => {
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: TECHNICIAN_DETAILS_RESET });
  };

  if (!adminUserInfo) {
    return null;
  }

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        {loadingUser || loadingTechnician ? (
          <Loader />
        ) : errorUser && errorTechnician ? (
          <Message variant="danger">{errorUser || errorTechnician}</Message>
        ) : user ? (
          <>
            <Link to="/admin/dashboard" className="btn btn-light my-3">
              <Button
                variant="secondary"
                className="rounded-md"
                onClick={handleBack}
              >
                <i className="fas fa-arrow-left"></i> Go Back
              </Button>
            </Link>
            {successMessage && <Message>{successMessage}</Message>}
            <EditProfile
              user={user}
              setIsEditing={setIsEditing}
              userType={userType}
            />
          </>
        ) : (
          <Message>
            {{ status: "404", message: "User or Technician not Found" }}
          </Message>
        )}
      </div>
    </section>
  );
};

export default EditProfileScreen;
