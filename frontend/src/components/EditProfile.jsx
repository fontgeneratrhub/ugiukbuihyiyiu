import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { technicianUpdateProfile } from "../redux/actions/technicianActions.js";
import { adminUpdateProfile } from "../redux/actions/adminActions.js";
import { updateProfile } from "../redux/actions/userActions.js";

import avi from "../images/User-avatar.svg.png";
import Button from "./Button";
import Message from "./Message.jsx";

const EditProfile = ({ user, setIsEditing, userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData =
    userType === "technician"
      ? {
          name: user.name,
          phone: user.phone,
          email: user.email,
          cnic: user.cnic,
          location: user.location,
          experience: user.experience,
          address: user.address,
        }
      : userType === "admin"
      ? {
          name: user.name,
          email: user.email,
        }
      : {
          name: user.name,
          email: user.email,
        };

  const [formData, setFormData] = useState(initialFormData);

  const adminUserUpdateProfile = useSelector(
    (state) => state.adminUserUpdateProfile
  );
  const { error: adminUpdateError } = adminUserUpdateProfile;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { error: userUpdateError } = userUpdateProfile;

  const technicianUserUpdateProfile = useSelector(
    (state) => state.technicianUserUpdateProfile
  );
  const { error: techUpdateError } = technicianUserUpdateProfile;

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userType === "technician") {
      dispatch(
        technicianUpdateProfile(
          formData.email,
          formData.name,
          formData.phone,
          formData.location,
          formData.cnic,
          formData.experience,
          formData.address,
          user._id
        )
      );
      if (!techUpdateError) {
        setIsEditing(false);
      }
      navigate("/technician/dashboard");
    } else if (userType === "admin") {
      dispatch(adminUpdateProfile(formData.email, formData.name, user._id));
      if (!adminUpdateError) {
        setIsEditing(false);
      }
      navigate("/admin/dashboard");
    } else if (userType === "user") {
      dispatch(updateProfile(formData.email, formData.name, user._id));
      if (!userUpdateError) {
        setIsEditing(false);
      }
      navigate("/dashboard");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  return (
    <div className="sm:w-1/2 w-full bg-gray-900 flex flex-col justify-center items-center text-justify rounded-lg shadow-lg mb-4 sm:m-2 px-6 py-2 border-2 border-transparent hover:shadow-xl hover:border-gray-700 transition-colors duration-300">
      <img className="w-32 h-32 rounded-full m-2" src={avi} alt="User Avatar" />
      <form onSubmit={handleFormSubmit} className="w-full">
        {(userUpdateError || techUpdateError) && (
          <Message>{userUpdateError || techUpdateError}</Message>
        )}
        <div className="mb-4">
          <label
            className="block text-white text-lg font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
            value={formData.name}
            onChange={handleFieldChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-lg font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
            value={formData.email}
            onChange={handleFieldChange}
          />
        </div>

        {userType === "technician" && (
          <>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold mb-2"
                htmlFor="phone"
              >
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                value={formData.phone}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold mb-2"
                htmlFor="location"
              >
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                value={formData.location}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold mb-2"
                htmlFor="address"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                value={formData.address}
                onChange={handleFieldChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold mb-2"
                htmlFor="experience"
              >
                Experience:
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                value={formData.experience}
                onChange={handleFieldChange}
              />
            </div>
          </>
        )}

        <div className="flex justify-between">
          <Button type="submit" variant="success" className="rounded-md">
            Save Changes
          </Button>
          <Button
            variant="danger"
            className="rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
