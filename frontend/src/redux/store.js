import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  adminUserLoginReducer,
  adminUserRegisterReducer,
  adminUserUpdateProfileReducer,
} from "./reducers/adminReducers.js";
import {
  feedbackCreateReducer,
  feedbackDeleteReducer,
  feedbackListAllReducer,
  feedbackListTechnicianReducer,
  feedbackListUserReducer,
  feedbackUpdateReducer,
} from "./reducers/feedBackReducers.js";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderListAllReducer,
  orderListTechnicianReducer,
  orderListUserReducer,
  orderStatusUpdateReducer,
} from "./reducers/orderReducers.js";
import {
  categoryListReducer,
  technicianDetailsReducer,
  technicianUserDeleteReducer,
  technicianUserListReducer,
  technicianUserLoginReducer,
  technicianUserRegisterReducer,
  technicianUserUpdateProfileReducer,
  technicianUserSubscriptionReducer,
} from "./reducers/technicianReducers.js";
import {
  logoutReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers.js";

const reducer = combineReducers({
  adminUserLogin: adminUserLoginReducer,
  adminUserRegister: adminUserRegisterReducer,
  adminUserUpdateProfile: adminUserUpdateProfileReducer,
  feedbackCreate: feedbackCreateReducer,
  feedbackDelete: feedbackDeleteReducer,
  feedbackListAll: feedbackListAllReducer,
  feedbackListTechnician: feedbackListTechnicianReducer,
  feedbackListUser: feedbackListUserReducer,
  feedbackUpdate: feedbackUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  orderListAll: orderListAllReducer,
  orderListTechnician: orderListTechnicianReducer,
  orderListUser: orderListUserReducer,
  orderStatusUpdate: orderStatusUpdateReducer,
  categoryList: categoryListReducer,
  technicianUserLogin: technicianUserLoginReducer,
  technicianUserRegister: technicianUserRegisterReducer,
  technicianUserDelete: technicianUserDeleteReducer,
  technicianUserUpdateProfile: technicianUserUpdateProfileReducer,
  technicianDetails: technicianDetailsReducer,
  technicianUserList: technicianUserListReducer,
  technicianUserSubscription: technicianUserSubscriptionReducer,
  logout: logoutReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const adminUserInfoFromStorage = localStorage.getItem("adminUserInfo")
  ? JSON.parse(localStorage.getItem("adminUserInfo"))
  : null;

const techUserInfoFromStorage = localStorage.getItem("techUserInfo")
  ? JSON.parse(localStorage.getItem("techUserInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminUserLogin: { adminUserInfo: adminUserInfoFromStorage },
  technicianUserLogin: { techUserInfo: techUserInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
