import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { technicianLogin } from "../../redux/actions/technicianActions";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const TechLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { adminUserInfo } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { loading, error, techUserInfo } = technicianUserLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (techUserInfo || adminUserInfo || userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, techUserInfo, adminUserInfo, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch Login
    dispatch(technicianLogin(email, password));
  };

  const forgetPwdHandler = () => {
    console.log("Forget Password");
    // Send email to user to reset password
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-sky-800 text-white p-4 sm:p-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-4xl text-center font-bold mb-4 mt-14 sm:mt-0">
              Welcome to Technician Portal!
            </h1>
            <div className="flex flex-col items-center justify-evenly md:flex-row">
              <div className="w-full max-w-2xl flex flex-col items-center justify-center my-4 mx-auto p-4 sm:p-6 lg:p-8">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="w-full"
                  alt="Phone image"
                />
              </div>
              <form
                className="w-full max-w-2xl flex flex-col items-center justify-center rounded-lg border border-sky-400 my-4 mx-auto p-4 sm:p-6 lg:p-8"
                onSubmit={submitHandler}
              >
                <p className="text-center text-xl leading-relaxed">
                  Sign in to your Account <br />
                  <span className="text-sm text-sky-500">
                    You've been Missed!
                  </span>
                </p>

                {error && <Message variant="danger">{error}</Message>}

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
                      className="w-full bg-sky-600 rounded-lg placeholder-sky-400 border-sky-400 p-4 pr-12 text-sm shadow-sm"
                    />
                    <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-sky-400"
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
                      className="w-full bg-sky-600 rounded-lg placeholder-sky-400 border-sky-400 p-4 pr-12 text-sm shadow-sm"
                    />
                    <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
                      <i className="fas fa-lock h-4 w-4 text-sky-400"></i>
                    </span>
                  </div>

                  {/* <div className="flex justify-between items-center w-full mt-4">
                    <div className="flex items-center">
                      <Link
                        onClick={forgetPwdHandler}
                        className="text-sm text-sky-400 hover:text-white"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div> */}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full rounded-full"
                >
                  Login
                </Button>

                <p className="text-center text-sm text-sky-400">
                  No account?{" "}
                  <Link
                    className="underline text-white"
                    to="/technician/register"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TechLoginScreen;
