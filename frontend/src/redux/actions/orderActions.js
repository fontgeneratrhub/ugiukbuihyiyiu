import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_TECHNICIAN_FAIL,
  ORDER_LIST_TECHNICIAN_REQUEST,
  ORDER_LIST_TECHNICIAN_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../constants/orderConstants.js";
import axios from "axios";

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
        "/api/order/book",
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

export const listAllOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      adminUserLogin: { adminUserInfo },
    } = getState();

    const { data } = await axios.get(`/api/order/showAll/${id}`, {
      headers: {
        Authorization: `Bearer ${adminUserInfo.token}`,
      },
    });

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

    const { data } = await axios.get(`/api/user/userOrders/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

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

    const { data } = await axios.get(`/api/technician/technicianOrders/${id}`, {
      headers: {
        Authorization: `Bearer ${techUserInfo.token}`,
      },
    });

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
