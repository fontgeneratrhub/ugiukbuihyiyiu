import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Dashboard from "../../components/Dashboard/Dashboard";

const TechDashboard = () => {
  const navigate = useNavigate();

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  useEffect(() => {
    // Check if technician is not logged in
    if (!techUserInfo) {
      navigate("/technician/login");
    }
  }, [navigate, techUserInfo]);

  useEffect(() => {
    // Check if any other user type is logged in (redirect to homepage)
    if (userInfo || adminUserInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, adminUserInfo]);

  return <Dashboard variant="technician" />;
};

export default TechDashboard;
