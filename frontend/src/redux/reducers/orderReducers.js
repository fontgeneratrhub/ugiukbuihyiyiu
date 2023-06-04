import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_TECHNICIAN_FAIL,
  ORDER_LIST_TECHNICIAN_REQUEST,
  ORDER_LIST_TECHNICIAN_RESET,
  ORDER_LIST_TECHNICIAN_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_RESET,
  ORDER_LIST_USER_SUCCESS,
} from "../constants/orderConstants.js";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        orderInfo: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListUserReducer = (state = { userOrders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_USER_REQUEST:
      return { loading: true };
    case ORDER_LIST_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        userOrders: action.payload,
      };
    case ORDER_LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_USER_RESET:
      return { userOrders: [] };
    default:
      return state;
  }
};

export const orderListTechnicianReducer = (
  state = { technicianOrders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_TECHNICIAN_REQUEST:
      return { loading: true };
    case ORDER_LIST_TECHNICIAN_SUCCESS:
      return {
        loading: false,
        success: true,
        technicianOrders: action.payload,
      };
    case ORDER_LIST_TECHNICIAN_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_TECHNICIAN_RESET:
      return { technicianOrders: [] };
    default:
      return state;
  }
};
