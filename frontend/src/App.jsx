import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import NavbarCmp from "./components/NavbarCmp";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import AdminLoginScreen from "./screens/Admin/AdminLoginScreen";
import AdminRegisterScreen from "./screens/Admin/AdminRegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FindTechniciansScreen from "./screens/Technician/FindTechniciansScreen";
import TechDashboard from "./screens/Technician/TechDashboard";
import TechLoginScreen from "./screens/Technician/TechLoginScreen";
import TechProfileScreen from "./screens/Technician/TechProfileScreen";
import TechRegisterScreen from "./screens/Technician/TechRegisterScreen";
import UserDashboard from "./screens/User/UserDashboard";
import UserLoginScreen from "./screens/User/UserLoginScreen";
import UserRegisterScreen from "./screens/User/UserRegisterScreen";

function App() {
  return (
    <Router>
      <NavbarCmp />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/login" element={<UserLoginScreen />} />
        <Route path="/register" element={<UserRegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/technicians" element={<FindTechniciansScreen />} />
        <Route path="/technician/login" element={<TechLoginScreen />} />
        <Route path="/technician/register" element={<TechRegisterScreen />} />
        <Route path="/technician/dashboard" element={<TechDashboard />} />
        <Route path="/technician/:id" element={<TechProfileScreen />} />
        <Route path="/admin/login" element={<AdminLoginScreen />} />
        <Route path="/admin/register" element={<AdminRegisterScreen />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
