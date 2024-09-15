import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./Assets/Styles/index.scss";
import App from "./App";
import store from "./Store/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
