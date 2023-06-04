import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_RESET,
  ORDER_LIST_USER_SUCCESS,
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
