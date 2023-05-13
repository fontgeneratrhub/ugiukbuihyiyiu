import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const AdminRegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("SuccessFully Registered");
    // Check if Form is valid then Create Account and Login Automatically!
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white p-20">
      <div className="mx-auto max-w-screen-xl w-3/4 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Admin Register Portal!
        </h1>
        <form
          className="max-w-lg w-full flex flex-col items-center justify-center rounded-lg border border-gray-400 my-4 mx-auto p-4 sm:p-6 lg:p-8"
          onSubmit={submitHandler}
        >
          <p className="text-center text-xl leading-relaxed pb-4">
            Create New Account
          </p>

          <div className="w-full">
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
              <button
                className="absolute inset-y-0 right-0 grid place-content-center px-4"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-gray-400 cursor-pointer"
                  >
                    <path d="M12 18c3.68 0 6.904-2.02 8.605-5.007a.5.5 0 0 0-.009-.527C18.912 9.225 15.668 6 12 6S5.088 9.225 3.404 12.466a.5.5 0 0 0-.009.527C5.096 15.98 8.32 18 12 18z" />
                    <path d="M12 8.5c1.932 0 3.5 1.567 3.5 3.5s-1.568 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.568-3.5 3.5-3.5z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-gray-400 cursor-pointer"
                  >
                    <path d="M12 15.5c-1.932 0-3.5-1.567-3.5-3.5s1.568-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.568 3.5-3.5 3.5zM12 8.5c3.68 0 6.904 2.02 8.605 5.007a.5.5 0 0 1-.009.527C18.912 14.775 15.668 18 12 18s-6.912-2.225-8.596-5.466a.5.5 0 0 1-.009-.527C5.096 10.02 8.32 8 12 8z" />
                  </svg>
                )}
              </button>
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
              <button
                className="absolute inset-y-0 right-0 grid place-content-center px-4"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-gray-400 cursor-pointer"
                  >
                    <path d="M12 18c3.68 0 6.904-2.02 8.605-5.007a.5.5 0 0 0-.009-.527C18.912 9.225 15.668 6 12 6S5.088 9.225 3.404 12.466a.5.5 0 0 0-.009.527C5.096 15.98 8.32 18 12 18z" />
                    <path d="M12 8.5c1.932 0 3.5 1.567 3.5 3.5s-1.568 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.568-3.5 3.5-3.5z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-gray-400 cursor-pointer"
                  >
                    <path d="M12 15.5c-1.932 0-3.5-1.567-3.5-3.5s1.568-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.568 3.5-3.5 3.5zM12 8.5c3.68 0 6.904 2.02 8.605 5.007a.5.5 0 0 1-.009.527C18.912 14.775 15.668 18 12 18s-6.912-2.225-8.596-5.466a.5.5 0 0 1-.009-.527C5.096 10.02 8.32 8 12 8z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            classNames="w-full rounded-md"
          >
            Register
          </Button>

          <p className="text-center text-sm text-gray-400">
            Already hav an Account?{" "}
            <Link className="underline text-white" to="/admin/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default AdminRegisterScreen;
