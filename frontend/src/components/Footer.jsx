import React from "react";
import { Link } from "react-router-dom";

import Button from "./Button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full shadow-md transition-all duration-500 ">
      <div className="flex flex-col items-center pt-4">
        <div className="flex flex-row items-center justify-around py-4 text-gray-400 w-full">
          <div className="flex flex-col items-center justify-center ">
            <h5 className="uppercase mb-6 font-bold">Kariger.com</h5>
            <p className="mb-4">1234 Main Street</p>
            <p className="mb-4">Anytown, USA 12345</p>
            <p className="mb-4">(123) 456-7890</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h5 className="uppercase mb-6 font-bold">Quick Links</h5>
            <Link to="/" className="hover:text-gray-200 mb-4">
              Home
            </Link>
            <Link to="/technicians" className="hover:text-gray-200 mb-4">
              Technicians
            </Link>
            <Link to="/contact-us" className="hover:text-gray-200 mb-4">
              Contact
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h5 className="uppercase mb-6 font-bold">Social</h5>
            <a href="#" className="hover:text-gray-200 mb-4">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-200 mb-4">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-200 mb-4">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-evenly py-4 border-t border-gray-400">
        <Link to="/technician/login">
          <Button
            variant="outline"
            className="p-2 rounded-md text-white text-sm"
          >
            Login as Technician
          </Button>
        </Link>

        <p className="text-gray-400 text-sm">
          &copy; 2023 Kariger.com. All rights reserved.
        </p>

        <Link to="/admin/login">
          <Button
            variant="outline"
            className="p-2 rounded-md text-white text-sm"
          >
            Login as Admin
          </Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
