import axios from "axios";
import {
  TECHNICIAN_LOGIN_FAIL,
  TECHNICIAN_LOGIN_REQUEST,
  TECHNICIAN_LOGIN_SUCCESS,
  TECHNICIAN_REGISTER_FAIL,
  TECHNICIAN_REGISTER_REQUEST,
  TECHNICIAN_REGISTER_SUCCESS,
  TECHNICIAN_DETAILS_FAIL,
  TECHNICIAN_DETAILS_REQUEST,
  TECHNICIAN_DETAILS_SUCCESS,
  TECHNICIAN_LIST_REQUEST,
  TECHNICIAN_LIST_SUCCESS,
  TECHNICIAN_LIST_FAIL,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/technicianConstants";

export const technicianLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: TECHNICIAN_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/technician/login",
      { email, password },
      config
    );

    dispatch({
      type: TECHNICIAN_LOGIN_SUCCESS,
      payload: { user: data.user, token: data.token },
    });
    localStorage.setItem(
      "techUserInfo",
      JSON.stringify({ user: data.user, token: data.token })
    );
  } catch (error) {
    dispatch({
      type: TECHNICIAN_LOGIN_FAIL,
      payload: {
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const technicianRegister =
  (
    name,
    email,
    password,
    confirmPassword,
    cnic,
    location,
    experience,
    phone,
    address,
    categoryId
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: TECHNICIAN_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/technician/signUp",
        {
          name,
          email,
          password,
          confirmPassword,
          cnic,
          location,
          experience,
          phone,
          address,
          categoryId,
        },
        config
      );

      dispatch({
        type: TECHNICIAN_REGISTER_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
      dispatch({
        type: TECHNICIAN_LOGIN_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
      localStorage.setItem(
        "techUserInfo",
        JSON.stringify({ user: data.user, token: data.token })
      );
    } catch (error) {
      dispatch({
        type: TECHNICIAN_REGISTER_FAIL,
        payload: {
          status: error.response && error.response.status,
          message:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        },
      });
    }
  };

export const getTechnicianDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TECHNICIAN_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/technician/single/${id}`);

    dispatch({
      type: TECHNICIAN_DETAILS_SUCCESS,
      payload: data.technician,
    });

    localStorage.setItem("techDetails", JSON.stringify(data.technician));
  } catch (error) {
    dispatch({
      type: TECHNICIAN_DETAILS_FAIL,
      payload: {
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const listTechnicians = () => async (dispatch) => {
  try {
    dispatch({ type: TECHNICIAN_LIST_REQUEST });

    const { data } = await axios.get("/api/technician/showAll");

    dispatch({
      type: TECHNICIAN_LIST_SUCCESS,
      payload: data.technicians,
    });
  } catch (error) {
    dispatch({
      type: TECHNICIAN_LIST_FAIL,
      payload: {
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const listTechnicianCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get("/api/category/showAll");

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    console.log("Error fetching categories:", error);

    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: {
        status: error.response && error.response.status,
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
