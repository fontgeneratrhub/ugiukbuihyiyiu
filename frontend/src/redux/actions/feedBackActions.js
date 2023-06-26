import axios from "axios";
import {
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_DELETE_FAIL,
  FEEDBACK_DELETE_REQUEST,
  FEEDBACK_DELETE_SUCCESS,
  FEEDBACK_LIST_FAIL,
  FEEDBACK_LIST_REQUEST,
  FEEDBACK_LIST_SUCCESS,
  FEEDBACK_LIST_TECHNICIAN_FAIL,
  FEEDBACK_LIST_TECHNICIAN_REQUEST,
  FEEDBACK_LIST_TECHNICIAN_SUCCESS,
  FEEDBACK_LIST_USER_FAIL,
  FEEDBACK_LIST_USER_REQUEST,
  FEEDBACK_LIST_USER_SUCCESS,
  FEEDBACK_STATUS_UPDATE_FAIL,
  FEEDBACK_STATUS_UPDATE_REQUEST,
  FEEDBACK_STATUS_UPDATE_SUCCESS,
} from "../constants/feedBackConstants.js";

const backendApiUrl =
  `https://kariger-com-app-mern-backend.vercel.app` || `http://localhost:4000`;

export const createFeedback =
  (userId, technicianId, description, stars) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FEEDBACK_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${backendApiUrl}/api/feedback/add`,
        { userId, technicianId, description, stars },
        config
      );

      dispatch({
        type: FEEDBACK_CREATE_SUCCESS,
        payload: data.feedback,
      });
    } catch (error) {
      dispatch({
        type: FEEDBACK_CREATE_FAIL,
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

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FEEDBACK_DELETE_REQUEST,
    });

    await axios.delete(`${backendApiUrl}/api/feedback/delete/${id}`);

    dispatch({
      type: FEEDBACK_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_DELETE_FAIL,
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

export const listAllFeedbacks = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FEEDBACK_LIST_REQUEST,
    });

    const {
      adminUserLogin: { adminUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${backendApiUrl}/api/feedback/showAll/${id}`,
      {
        config,
      }
    );

    dispatch({
      type: FEEDBACK_LIST_SUCCESS,
      payload: data.feedback,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_LIST_FAIL,
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

export const listUserFeedbacks = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FEEDBACK_LIST_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${backendApiUrl}/api/user/userFeedbacks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: FEEDBACK_LIST_USER_SUCCESS,
      payload: data.feedback,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_LIST_USER_FAIL,
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

export const listTechnicianFeedbacks = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FEEDBACK_LIST_TECHNICIAN_REQUEST,
    });

    // const {
    //   technicianUserLogin: { techUserInfo },
    // } = getState();

    const { data } = await axios.get(
      `${backendApiUrl}/api/technician/technicianFeedbacks/${id}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${techUserInfo.token}`,
      //   },
      // }
    );

    dispatch({
      type: FEEDBACK_LIST_TECHNICIAN_SUCCESS,
      payload: data.feedback,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_LIST_TECHNICIAN_FAIL,
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

export const updateFeedback = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: FEEDBACK_STATUS_UPDATE_REQUEST,
    });

    await axios.put(`${backendApiUrl}/api/feedback/update/${id}`, { status });

    dispatch({
      type: FEEDBACK_STATUS_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_STATUS_UPDATE_FAIL,
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
