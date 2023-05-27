import React from "react";

const Features = () => {
  const benefits = [
    {
      id: 1,
      title: "24/7 Availability",
      description:
        "Our site and app are available 24/7, so you can book a technician anytime, anywhere.",
    },
    {
      id: 2,
      title: "Qualified Technicians",
      description:
        "All of our technicians are fully qualified and experienced in their respective fields.",
    },
    {
      id: 3,
      title: "Fast Response Time",
      description:
        "We understand that time is of the essence, so we strive to provide fast and efficient service.",
    },
    {
      id: 4,
      title: "Affordable Prices",
      description:
        "We offer competitive pricing without sacrificing quality, so you can save money and get the best service.",
    },
  ];
  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 to-gray-700 text-white p-10 sm:p-20">
      <div className="flex flex-col items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center mb-10">Why Choose Us?</h1>
        <div className="flex flex-col sm:flex-row justify-center">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center justify-center bg-gray-800 border border-gray-400 rounded-lg p-4 m-4 flex-1 hover:shadow-lg"
            >
              <div className="rounded-full bg-green-500 mr-4 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-9.414l3.293 3.293a1 1 0 11-1.414 1.414L11 10.414V14a1 1 0 11-2 0v-3.586l-1.293 1.293a1 1 0 01-1.414-1.414l3.293-3.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold my-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm mb-2">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
