import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  listTechnicianCategories,
  technicianRegister,
} from "../../redux/actions/technicianActions";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const TechRegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [techlocation, setTechLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(listTechnicianCategories());
  }, [dispatch]);

  // const categories = {
  //   category: [
  //     {
  //       _id: "60f9b6b3e6c9a00f1c1b4b1b",
  //       name: "Electrician",
  //       createdAt: "2021-07-22T12:12:03.000Z",
  //       updatedAt: "2021-07-22T12:12:03.000Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "60f9b6b3e6c9a00f1c1b4b1c",
  //       name: "Plumber",
  //       createdAt: "2021-07-22T12:12:03.000Z",
  //       updatedAt: "2021-07-22T12:12:03.000Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "60f9b6b3e6c9a00f1c1b4b1d",
  //       name: "Carpenter",
  //       createdAt: "2021-07-22T12:12:03.000Z",
  //       updatedAt: "2021-07-22T12:12:03.000Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "60f9b6b3e6c9a00f1c1b4b1e",
  //       name: "Painter",
  //       createdAt: "2021-07-22T12:12:03.000Z",
  //       updatedAt: "2021-07-22T12:12:03.000Z",
  //       __v: 0,
  //     },
  //   ],
  // };

  const adminUserLogin = useSelector((state) => state.adminUserLogin);
  const { userInfo: adminUserInfo } = adminUserLogin;

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { userInfo: techUserInfo } = technicianUserLogin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  const technicianUserRegister = useSelector(
    (state) => state.technicianUserRegister
  );
  const { loading, error, userInfo: userInfo } = technicianUserRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (adminUserInfo || userInfoLogin || techUserInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, adminUserInfo, userInfoLogin, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords Don't Match");
    }
    dispatch(
      technicianRegister(
        name,
        email,
        cnic,
        techlocation,
        experience,
        phone,
        address,
        categoryId,
        password,
        confirmPassword
      )
    );
  };
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white p-6 sm:p-20">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-4xl text-center font-bold mb-4">
              Welcome to Technician Register Portal!
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
                <p className="text-center text-xl leading-relaxed">
                  Create New Account
                </p>

                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}

                <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 my-2">
                  <div>
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

                  <div>
                    <label htmlFor="cnic" className="sr-only">
                      CNIC
                    </label>
                    <input
                      type="text"
                      id="cnic"
                      value={cnic}
                      placeholder="Enter CNIC: 12345-1234567-8"
                      onChange={(e) => {
                        setCnic(e.target.value);
                      }}
                      required
                      className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="sr-only">
                      Location
                    </label>

                    <input
                      type="text"
                      id="location"
                      value={techlocation}
                      placeholder="Enter Location"
                      onChange={(e) => {
                        setTechLocation(e.target.value);
                      }}
                      required
                      className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="experience" className="sr-only">
                      Experience
                    </label>

                    <input
                      type="text"
                      id="experience"
                      value={experience}
                      placeholder="Enter Experience"
                      onChange={(e) => {
                        setExperience(e.target.value);
                      }}
                      required
                      className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      placeholder="Enter Phone Number"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      required
                      className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="sr-only">
                      Address
                    </label>

                    <input
                      type="text"
                      id="address"
                      value={address}
                      placeholder="Enter Address"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      required
                      className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="sr-only">
                      Category
                    </label>
                    <select
                      id="categoryId"
                      value={categoryId}
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                      }}
                      required
                      className="w-full bg-gray-600 rounded-lg border-gray-400 p-4 pr-12 text-sm shadow-sm"
                    >
                      <option value="" disabled>
                        -- Select a Category --
                      </option>
                      {categoryLoading ? (
                        <option>Loading...</option>
                      ) : categoryError ? (
                        <option>Error: {error}</option>
                      ) : (
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
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

                  <div>
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

                  <div>
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
                  <Link className="underline text-white" to="/technician/login">
                    Sign in
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

export default TechRegisterScreen;
