import axios from "axios";

import { ADMIN_LOGOUT } from "../constants/adminConstants.js";
import {
  ORDER_LIST_RESET,
  ORDER_LIST_TECHNICIAN_RESET,
  ORDER_LIST_USER_RESET,
} from "../constants/orderConstants.js";
import {
  TECHNICIAN_LOGOUT,
  TECHNICIAN_DETAILS_RESET,
} from "../constants/technicianConstants.js";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants.js";

const backendApiUrl =
  `https://kariger-com-app-mern-backend.vercel.app` || `http://localhost:4000`;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${backendApiUrl}/api/user/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { user: data.user, token: data.token },
    });
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ user: data.user, token: data.token })
    );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
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

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: TECHNICIAN_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_USER_RESET });
  dispatch({ type: ORDER_LIST_TECHNICIAN_RESET });
  dispatch({ type: ORDER_LIST_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
  dispatch({ type: ADMIN_LOGOUT });
  localStorage.removeItem("adminUserInfo");
  dispatch({ type: TECHNICIAN_LOGOUT });
  localStorage.removeItem("techUserInfo");
};

export const register =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendApiUrl}/api/user/signUp`,
        { name, email, password, confirmPassword },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ user: data.user, token: data.token })
      );
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
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

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`${backendApiUrl}/api/user/single/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
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

export const updateProfile = (email, name, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put(`${backendApiUrl}/api/user/update/${id}`, {
      email,
      name,
    });

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: { user: data.user },
    });
    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: { user: data.user, token: data.token },
    // });
    // localStorage.setItem(
    //   "userInfo",
    //   JSON.stringify({ user: data.user, token: data.token })
    // );
    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
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

export const listUsers = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      adminUserLogin: { adminUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${backendApiUrl}/api/user/showAll/${id}`,
      config
    );

    dispatch({ type: USER_LIST_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
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

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      adminUserLogin: { adminUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    };

    await axios.delete(`${backendApiUrl}/api/user/delete/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });

    dispatch({ type: USER_LIST_REQUEST });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
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
