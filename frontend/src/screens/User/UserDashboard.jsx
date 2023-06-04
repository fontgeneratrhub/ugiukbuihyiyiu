import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Dashboard from "../../components/Dashboard/Dashboard";

const UserDashboard = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  useEffect(() => {
    // Check if user is not logged in
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    // Check if any other user type is logged in (redirect to homepage)
    if (adminUserInfo || techUserInfo) {
      navigate("/");
    }
  }, [navigate, adminUserInfo, techUserInfo]);
  return <Dashboard variant="user" />;
};

export default UserDashboard;
