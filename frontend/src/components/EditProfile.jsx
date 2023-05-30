import React, { useState } from "react";
import Button from "./Button";

const EditProfile = ({ user, setIsEditing }) => {
  let role = "";
  if (user.isTechnician) {
    role = "technician";
  } else if (user.iAdmin) {
    role = "admin";
  } else {
    role = "user";
  }

  const initialFormData =
    role === "technician"
      ? {
          displayName: user.displayName,
          phone: user.phone,
          email: user.email,
          location: user.location,
          category: user.category,
          experience: user.experience,
          description: user.description,
          avatar: user.avatar,
        }
      : role === "admin"
      ? {
          displayName: user.displayName,
          phone: user.phone,
          email: user.email,
          location: user.location,
          category: user.category,
          description: user.description,
          avatar: user.avatar,
        }
      : {
          displayName: user.displayName,
          phone: user.phone,
          email: user.email,
          location: user.location,
          avatar: user.avatar,
        };

  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    setIsEditing(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded Avatar:", file);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setIsEditing(false);
  };

  return (
    <div className="sm:w-1/2 w-full bg-gray-900 flex flex-col justify-center items-center text-justify rounded-lg shadow-lg mb-4 sm:m-2 px-6 py-2 border-2 border-transparent hover:shadow-xl hover:border-gray-700 transition-colors duration-300">
      <img
        className="w-32 h-32 rounded-full m-2"
        src={formData.avatar}
        alt="User Avatar"
      />
      <form onSubmit={handleFormSubmit} className="w-full">
        <div className="mb-4">
          <label
            className="block text-white text-lg font-bold mb-2"
            htmlFor="displayName"
          >
            Display Name:
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
            value={formData.displayName}
            onChange={handleFieldChange}
          />
        </div>
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
        {role === "technician" && (
          <>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold mb-2"
                htmlFor="category"
              >
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                value={formData.category}
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
            <div className="mb-4">
              <label
                className="block text-white text-lg font-bold mb-2"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                value={formData.description}
                onChange={handleFieldChange}
              ></textarea>
            </div>
          </>
        )}
        {role === "admin" && (
          <div className="mb-4">
            <label
              className="block text-white text-lg font-bold mb-2"
              htmlFor="isAdmin"
            >
              Is Admin:
            </label>
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={formData.isAdmin}
              onChange={handleFieldChange}
            />
          </div>
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
