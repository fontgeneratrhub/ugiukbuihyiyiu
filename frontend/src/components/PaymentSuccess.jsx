import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { techincianSubscription } from "../redux/actions/technicianActions.js";

import Button from "./Button";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  useEffect(() => {
    setTimeout(() => {
      dispatch(techincianSubscription(techUserInfo.user._id)).then(() => {
        navigate("/technician/dashboard");
      });
    }, 3000);
  }, []);

  return (
    <section className="min-h-screen flex flex-row justify-center items-center bg-gray-800 text-white py-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-6">
        <div className="flex flex-col justify-center items-center">
          <i className="fas fa-thumbs-up fa-beat fa-fade text-6xl text-gray-500 mb-4"></i>
          <span className="text-gray-500 text-2xl sr-only">
            Payment Success!
          </span>
        </div>

        <h1 className="text-4xl text-center font-bold mt-4 mb-2">
          Payment Successful!
        </h1>

        <p className="text-lg text-center mb-4 text-gray-500">
          Payment is Successfully Transferred!
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

export default Success;
