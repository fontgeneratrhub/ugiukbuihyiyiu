import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  TECHNICIAN_LIST_FAIL,
  TECHNICIAN_LIST_REQUEST,
  TECHNICIAN_LIST_SUCCESS,
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
      return { loading: false, techUserInfo: action.payload };
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
      return { loading: false, techUserInfo: action.payload };
    case TECHNICIAN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const technicianUserListReducer = (
  state = { technicians: [] },
  action
) => {
  switch (action.type) {
    case TECHNICIAN_LIST_REQUEST:
      return { loading: true, technicians: [] };
    case TECHNICIAN_LIST_SUCCESS:
      return { loading: false, technicians: action.payload };
    case TECHNICIAN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
