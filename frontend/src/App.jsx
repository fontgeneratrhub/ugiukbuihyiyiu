import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavbarCmp from "./components/NavbarCmp";
import HomeScreen from "./screens/HomeScreen";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavbarCmp />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
