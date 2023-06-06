import {
  TECHNICIAN_DELETE_FAIL,
  TECHNICIAN_DELETE_REQUEST,
  TECHNICIAN_DELETE_SUCCESS,
} from "../constants/adminConstants.js";

import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  TECHNICIAN_DETAILS_FAIL,
  TECHNICIAN_DETAILS_REQUEST,
  TECHNICIAN_DETAILS_SUCCESS,
  TECHNICIAN_DETAILS_RESET,
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
  TECHNICIAN_UPDATE_PROFILE_FAIL,
  TECHNICIAN_UPDATE_PROFILE_REQUEST,
  TECHNICIAN_UPDATE_PROFILE_RESET,
  TECHNICIAN_UPDATE_PROFILE_SUCCESS,
  TECHNICIAN_SUPSCRIPTION_FAIL,
  TECHNICIAN_SUPSCRIPTION_REQUEST,
  TECHNICIAN_SUPSCRIPTION_SUCCESS,
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

export const technicianUserUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case TECHNICIAN_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case TECHNICIAN_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, techUserInfo: action.payload };
    case TECHNICIAN_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case TECHNICIAN_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const technicianUserSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case TECHNICIAN_SUPSCRIPTION_REQUEST:
      return { loading: true };
    case TECHNICIAN_SUPSCRIPTION_SUCCESS:
      return { loading: false, success: true, techUserInfo: action.payload };
    case TECHNICIAN_SUPSCRIPTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const technicianUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TECHNICIAN_DELETE_REQUEST:
      return { loading: true };
    case TECHNICIAN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TECHNICIAN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const technicianDetailsReducer = (state = { techUser: {} }, action) => {
  switch (action.type) {
    case TECHNICIAN_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TECHNICIAN_DETAILS_SUCCESS:
      return { loading: false, techUser: action.payload };
    case TECHNICIAN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TECHNICIAN_DETAILS_RESET:
      return { techUser: {} };
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
