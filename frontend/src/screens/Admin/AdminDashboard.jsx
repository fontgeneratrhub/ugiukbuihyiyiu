import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Dashboard from "../../components/Dashboard/Dashboard";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  useEffect(() => {
    if (!adminUserInfo || userInfo || techUserInfo) {
      navigate("/admin/login");
    }
  }, [navigate, adminUserInfo, userInfo, techUserInfo]);

  return <Dashboard variant="admin" />;
};

export default AdminDashboard;
