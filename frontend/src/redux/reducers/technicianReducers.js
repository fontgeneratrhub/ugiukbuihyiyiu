import {
  TECHNICIAN_LOGIN_FAIL,
  TECHNICIAN_LOGIN_REQUEST,
  TECHNICIAN_LOGIN_SUCCESS,
  TECHNICIAN_LOGOUT,
  TECHNICIAN_REGISTER_FAIL,
  TECHNICIAN_REGISTER_REQUEST,
  TECHNICIAN_REGISTER_SUCCESS,
} from "../constants/technicianConstants";

export const technicianUserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case TECHNICIAN_LOGIN_REQUEST:
      return { loading: true };
    case TECHNICIAN_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case TECHNICIAN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case TECHNICIAN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const technicianUserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TECHNICIAN_REGISTER_REQUEST:
      return { loading: true };
    case TECHNICIAN_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case TECHNICIAN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
