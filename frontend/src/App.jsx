import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import NavbarCmp from "./components/NavbarCmp";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import AdminLoginScreen from "./screens/Admin/AdminLoginScreen";
import AdminRegisterScreen from "./screens/Admin/AdminRegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import TechLoginScreen from "./screens/Technician/TechLoginScreen";
import TechRegisterScreen from "./screens/Technician/TechRegisterScreen";

function App() {
  return (
    <Router>
      <NavbarCmp />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/technician/login" element={<TechLoginScreen />} />
        <Route path="/technician/register" element={<TechRegisterScreen />} />
        <Route path="/admin/login" element={<AdminLoginScreen />} />
        <Route path="/admin/register" element={<AdminRegisterScreen />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
