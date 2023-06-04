import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_UPDATE_PROFILE_FAIL,
  ADMIN_UPDATE_PROFILE_REQUEST,
  ADMIN_UPDATE_PROFILE_SUCCESS,
  ADMIN_UPDATE_PROFILE_RESET,
} from "../constants/adminConstants.js";

export const adminUserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminUserInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminUserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, adminUserInfo: action.payload };
    case ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminUserUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, adminUserInfo: action.payload };
    case ADMIN_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
