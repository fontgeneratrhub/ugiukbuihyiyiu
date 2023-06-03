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
} from "./reducers/adminReducers.js";
import {
  technicianUserLoginReducer,
  technicianUserRegisterReducer,
  categoryListReducer,
  technicianUserListReducer,
} from "./reducers/technicianReducers.js";
import {
  logoutReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers.js";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  adminUserLogin: adminUserLoginReducer,
  adminUserRegister: adminUserRegisterReducer,
  technicianUserLogin: technicianUserLoginReducer,
  technicianUserRegister: technicianUserRegisterReducer,
  technicianUserList: technicianUserListReducer,
  logout: logoutReducer,
  categoryList: categoryListReducer,
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
  technicianUserLogin: { technUserInfo: techUserInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
