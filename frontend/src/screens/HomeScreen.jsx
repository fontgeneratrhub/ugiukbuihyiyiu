import React from "react";

import Carousel from "../components/Home/Carousel";
import Features from "../components/Home/Features";
import Services from "../components/Home/Services";
import Testimonials from "../components/Home/Testimonials";

const HomeScreen = () => {
  return (
    <>
      <Carousel />
      <Services />
      <Features />
      <Testimonials />
    </>
  );
};

export default HomeScreen;
