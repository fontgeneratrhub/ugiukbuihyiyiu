import axios from "axios";
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_UPDATE_PROFILE_FAIL,
  ADMIN_UPDATE_PROFILE_REQUEST,
  ADMIN_UPDATE_PROFILE_SUCCESS,
  ADMIN_UPDATE_PROFILE_RESET,
} from "../constants/adminConstants";

const backendApiUrl =
  `https://kariger-com-app-mern-backend.vercel.app` || `http://localhost:4000`;

export const adminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${backendApiUrl}/api/admin/login`,
      { email, password },
      config
    );

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: { user: data.user, token: data.token },
    });
    localStorage.setItem(
      "adminUserInfo",
      JSON.stringify({ user: data.user, token: data.token })
    );
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
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

export const adminRegister =
  (name, email, password, confirmPassword, secretCode) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendApiUrl}/api/admin/signUp`,
        { name, email, password, confirmPassword, secretCode },
        config
      );

      dispatch({
        type: ADMIN_REGISTER_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: { user: data.user, token: data.token },
      });
      localStorage.setItem(
        "adminUserInfo",
        JSON.stringify({ user: data.user, token: data.token })
      );
    } catch (error) {
      dispatch({
        type: ADMIN_REGISTER_FAIL,
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

export const adminUpdateProfile =
  (email, name, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_UPDATE_PROFILE_REQUEST });

      const {
        adminUserLogin: { adminUserInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${backendApiUrl}/api/admin/update/${id}`,
        { email, name },
        config
      );

      dispatch({
        type: ADMIN_UPDATE_PROFILE_SUCCESS,
        payload: { user: data.admin },
      });

      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: { user: data.admin },
      });

      localStorage.setItem(
        "adminUserInfo",
        JSON.stringify({ user: data.admin })
      );
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_PROFILE_FAIL,
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
