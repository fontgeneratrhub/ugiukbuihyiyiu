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
  orderCreateReducer,
  orderListAllReducer,
  orderListTechnicianReducer,
  orderListUserReducer,
} from "./reducers/orderReducers.js";
import {
  categoryListReducer,
  technicianDetailsReducer,
  technicianUserDeleteReducer,
  technicianUserListReducer,
  technicianUserLoginReducer,
  technicianUserRegisterReducer,
  technicianUserUpdateProfileReducer,
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
  orderCreate: orderCreateReducer,
  orderListAll: orderListAllReducer,
  orderListTechnician: orderListTechnicianReducer,
  orderListUser: orderListUserReducer,
  categoryList: categoryListReducer,
  technicianUserLogin: technicianUserLoginReducer,
  technicianUserRegister: technicianUserRegisterReducer,
  technicianUserDelete: technicianUserDeleteReducer,
  technicianUserUpdateProfile: technicianUserUpdateProfileReducer,
  technicianDetails: technicianDetailsReducer,
  technicianUserList: technicianUserListReducer,
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
