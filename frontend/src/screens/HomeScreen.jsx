import React from "react";

import Carousel from "../components/Home/Carousel";
import Features from "../components/Home/Features";
import Jumbotron from "../components/Home/Jumbotron";
import Testimonials from "../components/Home/Testimonials";

const HomeScreen = () => {
  return (
    <>
      <Jumbotron />
      <Carousel />
      <Features />
      <Testimonials />
    </>
  );
};

export default HomeScreen;
