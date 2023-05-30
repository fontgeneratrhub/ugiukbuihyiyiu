import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="sm:w-1/2 w-full bg-gray-900 flex flex-col justify-center items-center text-justify rounded-lg shadow-lg mb-4 sm:m-2  px-6 py-2 border-2 border-transparent hover:shadow-xl hover:border-gray-700 transition-colors duration-300">
      <img
        className="w-32 h-32 rounded-full m-2"
        src={user.avatar}
        alt="User Avatar"
      />
      <h2 className="text-white text-lg font-bold mb-2">{user.displayName}</h2>

      <div className="text-gray-300 text-sm">
        <i className="fas fa-phone-alt mt-4 mr-2"></i>
        Phone: {user.phone}
      </div>

      <div className="text-gray-300 text-sm ">
        <i className="fas fa-envelope mr-2"></i>
        Email: {user.email}
      </div>

      <hr className="border-gray-700 my-4 w-1/2" />

      <div className="flex sm:flex-row flex-col">
        <h2 className="text-gray-300 text-sm font-light mr-0 sm:mr-4 mb-2">
          <i className="fas fa-map-marker-alt mr-2"></i>
          Location: {user.location}
        </h2>

        {user.category && (
          <h2 className="text-gray-300 text-sm font-light mb-2">
            <i className="fas fa-layer-group mr-2"></i>
            Category: {user.category}
          </h2>
        )}
      </div>

      {user.experience && (
        <h2 className="text-gray-300 text-sm font-light mb-2">
          <i className="fas fa-clock mr-2"></i>
          Experience: {user.experience}
        </h2>
      )}

      {user.rating && (
        <h2 className="text-yellow-400 text-lg font-bold mb-2">
          <i className="fas fa-star mr-2"></i>
          Rating: {user.rating}
        </h2>
      )}

      {user.isAdmin && (
        <div className="text-white text-lg font-bold mb-2">Role: Admin</div>
      )}
      <hr className="border-gray-700 my-4 w-1/2" />

      <p className="text-gray-300 text-sm mb-4">{user.description}</p>
    </div>
  );
};

export default Profile;
