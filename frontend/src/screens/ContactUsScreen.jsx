import React, { useState } from "react";
import Button from "../components/Button";

const ContactUsScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully");
    console.log(formData);
  };
  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        <h1 className="text-4xl text-center font-bold mb-4">Contact-US</h1>

        <div className="sm:w-2/3 w-full bg-gray-900 flex flex-col justify-center items-center text-justify rounded-lg shadow-lg mb-4 sm:m-2  px-6 py-2 border-2 border-transparent hover:shadow-xl hover:border-gray-700 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="w-full p-10">
            <div className="flex flex-col mb-4">
              <label
                htmlFor="name"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-500"
              >
                Name:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fas fa-user"></i>
                </div>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                  placeholder="Your Name"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-500"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fas fa-envelope"></i>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder="Your Email"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="message"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-500"
              >
                Message:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <i className="fas fa-comment"></i>
                </div>
                <textarea
                  id="message"
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleFieldChange}
                  placeholder="Your Message"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 w-full bg-gray-800 text-white rounded py-2 px-3 focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <Button type="submit" className="rounded-md" variant="primary">
              <span className="mr-2 uppercase">Send</span>
              <span>
                <i className="fas fa-arrow-right"></i>
              </span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsScreen;
