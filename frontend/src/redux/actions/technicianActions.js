import axios from "axios";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  TECHNICIAN_DETAILS_FAIL,
  TECHNICIAN_DETAILS_REQUEST,
  TECHNICIAN_DETAILS_RESET,
  TECHNICIAN_DETAILS_SUCCESS,
  TECHNICIAN_LIST_FAIL,
  TECHNICIAN_LIST_REQUEST,
  TECHNICIAN_LIST_SUCCESS,
  TECHNICIAN_LOGIN_FAIL,
  TECHNICIAN_LOGIN_REQUEST,
  TECHNICIAN_LOGIN_SUCCESS,
  TECHNICIAN_REGISTER_FAIL,
  TECHNICIAN_REGISTER_REQUEST,
  TECHNICIAN_REGISTER_SUCCESS,
  TECHNICIAN_UPDATE_PROFILE_FAIL,
  TECHNICIAN_UPDATE_PROFILE_REQUEST,
  TECHNICIAN_UPDATE_PROFILE_SUCCESS,
  TECHNICIAN_SUPSCRIPTION_FAIL,
  TECHNICIAN_SUPSCRIPTION_REQUEST,
  TECHNICIAN_SUPSCRIPTION_SUCCESS,
} from "../constants/technicianConstants.js";

import {
  TECHNICIAN_DELETE_FAIL,
  TECHNICIAN_DELETE_REQUEST,
  TECHNICIAN_DELETE_SUCCESS,
} from "../constants/adminConstants.js";

const backendApiUrl =
  `https://kariger-com-app-mern-backend.vercel.app` || `http://localhost:4000`;

export const technicianLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: TECHNICIAN_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${backendApiUrl}/api/technician/login`,
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
    categoryId,
    name,
    email,
    password,
    confirmPassword,
    location,
    experience,
    phone,
    cnic,
    address
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
        `${backendApiUrl}/api/technician/signUp`,
        {
          categoryId,
          name,
          email,
          password,
          confirmPassword,
          location,
          experience,
          phone,
          cnic,
          address,
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

export const technicianUpdateProfile =
  (email, name, phone, location, cnic, experience, address, id) =>
  async (dispatch) => {
    try {
      dispatch({ type: TECHNICIAN_UPDATE_PROFILE_REQUEST });

      const { data } = await axios.put(
        `${backendApiUrl}/api/technician/update/${id}`,
        {
          email,
          name,
          phone,
          location,
          cnic,
          experience,
          address,
        }
      );

      dispatch({
        type: TECHNICIAN_UPDATE_PROFILE_SUCCESS,
        payload: { user: data.technician },
      });

      // dispatch({
      //   type: TECHNICIAN_LOGIN_SUCCESS,
      //   payload: { user: data.technician },
      // });
      // localStorage.setItem(
      //   "techUserInfo",
      //   JSON.stringify({
      //     user: data.technician,
      //   })
      // );
      dispatch({
        type: TECHNICIAN_DETAILS_RESET,
      });
    } catch (error) {
      dispatch({
        type: TECHNICIAN_UPDATE_PROFILE_FAIL,
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

export const techincianSubscription = (id) => async (dispatch) => {
  try {
    dispatch({ type: TECHNICIAN_SUPSCRIPTION_REQUEST });

    const { data } = await axios.put(
      `${backendApiUrl}/api/technician/update/${id}`,
      {
        subscription: true,
      }
    );

    dispatch({
      type: TECHNICIAN_SUPSCRIPTION_SUCCESS,
      payload: { user: data.technician },
    });

    dispatch({
      type: TECHNICIAN_LOGIN_SUCCESS,
      payload: { user: data.technician },
    });
    // localStorage.setItem(
    //   "techUserInfo",
    //   JSON.stringify({
    //     user: data.technician,
    //   })
    // );
    dispatch({
      type: TECHNICIAN_DETAILS_RESET,
    });
  } catch (error) {
    dispatch({
      type: TECHNICIAN_SUPSCRIPTION_FAIL,
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

export const technicianDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TECHNICIAN_DELETE_REQUEST,
    });

    const {
      adminUserLogin: { adminUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    };

    await axios.delete(`${backendApiUrl}/api/technician/delete/${id}`, config);

    dispatch({
      type: TECHNICIAN_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TECHNICIAN_DELETE_FAIL,
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

    const { data } = await axios.get(
      `${backendApiUrl}/api/technician/single/${id}`
    );

    dispatch({
      type: TECHNICIAN_DETAILS_SUCCESS,
      payload: data.technician,
    });
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

    const { data } = await axios.get(`${backendApiUrl}/api/technician/showAll`);

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

    const { data } = await axios.get(`${backendApiUrl}/api/category/showAll`);

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
