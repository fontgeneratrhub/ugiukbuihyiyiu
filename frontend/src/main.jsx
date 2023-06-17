import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import store from "./redux/store";

// for Development(Local) Server
// axios.defaults.baseURL = "http://localhost:4000";

//for Production(Vercal) Server
axios.defaults.baseURL = "https://kariger-com-app-mern.vercel.app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
