import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const Jumbotron = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 flex justify-center items-center ">
      <div className="flex flex-col lg:flex-row items-center justify-center mx-auto pt-20 pb-6 px-4 lg:pb-0 lg:pt-12 sm:px-6 lg:px-10">
        <div className="w-full lg:w-1/2 px-4">
          <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
            Get Your Repairs, Done Right!
          </h1>
          <p className="text-md lg:text-lg text-justify text-gray-300 leading-relaxed mb-6">
            Say goodbye to the headache of finding reliable technicians.
            <span className="font-bold"> Kariger.com</span> is your one-stop
            solution for all kinds of repairs. Our network of skilled and
            trustworthy technicians are ready to help you with anything from
            appliance repair to plumbing, electrical, and HVAC services, etc.
          </p>
          <Link to="/technicians">
            <Button variant="outline" className="rounded-xl">
              Search Now
            </Button>
          </Link>
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <img
            className="rounded-lg shadow-lg"
            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
            alt="Technician"
          />
        </div>
      </div>
    </section>
  );
};
export default Jumbotron;
