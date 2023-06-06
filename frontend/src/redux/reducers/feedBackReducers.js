import {
  FEEDBACK_CREATE_FAIL,
  FEEDBACK_CREATE_REQUEST,
  FEEDBACK_CREATE_SUCCESS,
  FEEDBACK_DELETE_FAIL,
  FEEDBACK_DELETE_REQUEST,
  FEEDBACK_DELETE_SUCCESS,
  FEEDBACK_LIST_FAIL,
  FEEDBACK_LIST_REQUEST,
  FEEDBACK_LIST_RESET,
  FEEDBACK_LIST_SUCCESS,
  FEEDBACK_LIST_TECHNICIAN_FAIL,
  FEEDBACK_LIST_TECHNICIAN_REQUEST,
  FEEDBACK_LIST_TECHNICIAN_RESET,
  FEEDBACK_LIST_TECHNICIAN_SUCCESS,
  FEEDBACK_LIST_USER_FAIL,
  FEEDBACK_LIST_USER_REQUEST,
  FEEDBACK_LIST_USER_RESET,
  FEEDBACK_LIST_USER_SUCCESS,
  FEEDBACK_STATUS_UPDATE_FAIL,
  FEEDBACK_STATUS_UPDATE_REQUEST,
  FEEDBACK_STATUS_UPDATE_RESET,
  FEEDBACK_STATUS_UPDATE_SUCCESS,
} from "../constants/feedBackConstants.js";

export const feedbackCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_CREATE_REQUEST:
      return { loading: true };
    case FEEDBACK_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        feedbackInfo: action.payload,
      };
    case FEEDBACK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const feedbackListAllReducer = (
  state = { allFeedbacks: [] },
  action
) => {
  switch (action.type) {
    case FEEDBACK_LIST_REQUEST:
      return { loading: true };
    case FEEDBACK_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        allFeedbacks: action.payload,
      };
    case FEEDBACK_LIST_FAIL:
      return { loading: false, error: action.payload };
    case FEEDBACK_LIST_RESET:
      return { allFeedbacks: [] };
    default:
      return state;
  }
};

export const feedbackListUserReducer = (
  state = { userFeedbacks: [] },
  action
) => {
  switch (action.type) {
    case FEEDBACK_LIST_USER_REQUEST:
      return { loading: true };
    case FEEDBACK_LIST_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        userFeedbacks: action.payload,
      };
    case FEEDBACK_LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    case FEEDBACK_LIST_USER_RESET:
      return { userFeedbacks: [] };
    default:
      return state;
  }
};

export const feedbackListTechnicianReducer = (
  state = { technicianFeedbacks: [] },
  action
) => {
  switch (action.type) {
    case FEEDBACK_LIST_TECHNICIAN_REQUEST:
      return { loading: true };
    case FEEDBACK_LIST_TECHNICIAN_SUCCESS:
      return {
        loading: false,
        success: true,
        technicianFeedbacks: action.payload,
      };
    case FEEDBACK_LIST_TECHNICIAN_FAIL:
      return { loading: false, error: action.payload };
    case FEEDBACK_LIST_TECHNICIAN_RESET:
      return { technicianFeedbacks: [] };
    default:
      return state;
  }
};

export const feedbackDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_DELETE_REQUEST:
      return { loading: true };
    case FEEDBACK_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case FEEDBACK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const feedbackUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FEEDBACK_STATUS_UPDATE_REQUEST:
      return { loading: true };
    case FEEDBACK_STATUS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case FEEDBACK_STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FEEDBACK_STATUS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
