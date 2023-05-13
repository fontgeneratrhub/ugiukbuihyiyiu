import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import NavbarCmp from "./components/NavbarCmp";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import AdminLoginScreen from "./screens/Admin/AdminLoginScreen";
import AdminRegisterScreen from "./screens/Admin/AdminRegisterScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <NavbarCmp />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/admin/login" element={<AdminLoginScreen />} />
        <Route path="/admin/register" element={<AdminRegisterScreen />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
