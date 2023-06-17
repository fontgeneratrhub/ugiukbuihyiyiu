import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const NotFoundScreen = () => {
  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        <div className="flex flex-col justify-center items-center">
          <i className="fas fa-link-slash fa-spin fa-fade text-6xl text-gray-500 mb-4"></i>
          <span className="text-gray-500 text-2xl">Broken Link</span>
        </div>

        <h1 className="text-4xl text-center font-bold mt-4 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-center mb-4 text-gray-500">
          The requested page could not be found.
        </p>
        <Link to="/">
          <Button variant="secondary" className="rounded-md mr-2">
            <i className="fas fa-arrow-left mr-2"></i>
            Go back to the Homepage
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFoundScreen;
