import {
  ADMIN_USER_LOGIN_REQUEST,
  ADMIN_USER_LOGIN_SUCCESS,
  ADMIN_USER_LOGIN_FAIL,
  ADMIN_USER_LOGOUT,
  ADMIN_USER_REGISTER_REQUEST,
  ADMIN_USER_REGISTER_SUCCESS,
  ADMIN_USER_REGISTER_FAIL,
} from "../constants/adminConstants.js";

export const adminUserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ADMIN_USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminUserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ADMIN_USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
