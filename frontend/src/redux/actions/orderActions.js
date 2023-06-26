import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_TECHNICIAN_FAIL,
  ORDER_LIST_TECHNICIAN_REQUEST,
  ORDER_LIST_TECHNICIAN_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_SUCCESS,
  ORDER_STATUS_UPDATE_FAIL,
  ORDER_STATUS_UPDATE_REQUEST,
  ORDER_STATUS_UPDATE_RESET,
  ORDER_STATUS_UPDATE_SUCCESS,
} from "../constants/orderConstants.js";

const backendApiUrl =
  `https://kariger-com-app-mern-backend.vercel.app` || `http://localhost:4000`;

export const createOrder =
  (userId, technicianId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
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
        `${backendApiUrl}/api/order/book`,
        { userId, technicianId },
        config
      );

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data.order,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
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

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELETE_REQUEST,
    });

    await axios.delete(`${backendApiUrl}/api/order/delete/${id}`);

    dispatch({
      type: ORDER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
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

export const listAllOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      adminUserLogin: { adminUserInfo },
    } = getState();

    const { data } = await axios.get(
      `${backendApiUrl}/api/order/showAll/${id}`,
      {
        headers: {
          Authorization: `Bearer ${adminUserInfo.token}`,
        },
      }
    );

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
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

export const listUserOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${backendApiUrl}/api/user/userOrders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: ORDER_LIST_USER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_USER_FAIL,
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

export const listTechnicianOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_TECHNICIAN_REQUEST,
    });

    const {
      technicianUserLogin: { techUserInfo },
    } = getState();

    const { data } = await axios.get(
      `${backendApiUrl}/api/technician/technicianOrders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${techUserInfo.token}`,
        },
      }
    );

    dispatch({
      type: ORDER_LIST_TECHNICIAN_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_TECHNICIAN_FAIL,
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

export const updateOrderStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_STATUS_UPDATE_REQUEST,
    });

    await axios.put(`${backendApiUrl}/api/order/update/${id}`, { status });

    dispatch({
      type: ORDER_STATUS_UPDATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ORDER_STATUS_UPDATE_FAIL,
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
