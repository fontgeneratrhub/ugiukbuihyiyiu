import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { register } from "../../redux/actions/userActions";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const UserRegisterScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo: userRegInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userRegInfo || userInfo || adminUserInfo || techUserInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userRegInfo, userInfo, adminUserInfo, techUserInfo]);

  const submitHandler = (e) => {
    e.preventDefault(); //Dispatch Register
    // if (password != confirmPassword) {
    //   setMessage({
    //     status: "404",
    //     message: "Passwords Do not Match!",
    //   });
    // } else {
    dispatch(register(name, email, password, confirmPassword));
    // }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white p-4 sm:p-20">
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-center font-bold mb-4 mt-14 sm:mt-0">
            Welcome to Kariger.com Register Portal!
          </h1>

          <div className="flex flex-col items-center justify-evenly md:flex-row">
            <div className="w-full max-w-2xl flex flex-col items-center justify-center my-4 mx-auto p-4 sm:p-6 lg:p-8">
              <img
                src="https://socialplus.net/assets/img/svg/undraw_outer_space_re_u9vd.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <form
              className="w-full max-w-2xl flex flex-col items-center justify-center rounded-lg border border-gray-400 my-4 mx-auto p-4 sm:p-6 lg:p-8"
              onSubmit={submitHandler}
            >
              <p className="text-center text-xl leading-relaxed ">
                Create New Account
              </p>

              {/* {message && <Message type="error">{message}</Message>} */}
              {error && <Message>{error}</Message>}

              <div className="w-full mt-4">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                />
              </div>

              <div className="w-full my-4">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <div className="relative flex justify-center items-center w-full">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Enter Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                  />
                  <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative flex justify-center items-center w-full">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                  />
                  <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                    <i className="fas fa-lock h-4 w-4 text-gray-400"></i>
                  </span>
                </div>
              </div>

              <div className="w-full my-4">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative flex justify-center items-center w-full">
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    required
                    className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                  />
                  <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                    <i className="fas fa-lock h-4 w-4 text-gray-400"></i>
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full rounded-md"
              >
                Register
              </Button>

              <p className="text-center text-sm text-gray-400">
                Already have an Account?{" "}
                <Link className="underline text-white" to="/login">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserRegisterScreen;
