import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";

import App from "./App";
import "./index.css";
import store from "./redux/store";

// for Development(Local) Server
// axios.defaults.baseURL = "https://localhost:4000";

axios.defaults.baseURL = "https://kariger-com.vercel.app"; //for Production(Vercal) Server

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
