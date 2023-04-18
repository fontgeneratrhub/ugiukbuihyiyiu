import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faMobileAlt,
  faServer,
} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faLaptopCode} />,

      title: "Web Development",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faMobileAlt} />,
      title: "Mobile Development",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faServer} />,
      title: "Server Management",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
  ];

  return (
    <section className="min-h-screen flex justify-center items-center p-10">
      <div className="flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-10">Our Services</h1>
        <div className="flex flex-col sm:flex-row justify-center">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center justify-center m-4 rounded-lg p-8 border border-gray-500"
            >
              <div className="flex items-center justify-center bg-gray-800 text-white text-4xl p-10 rounded-full mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold my-3">{service.title}</h3>
              <p className="text-center my-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
