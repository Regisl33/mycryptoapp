//Import Dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
//Import the Style for our App
import "./Assets/Styles/index.scss";
//Import the App
import App from "./App";
//Import the Store
import store from "./Store/Store";
//Create our React Dom and Return Our App and Store in TypeStrict Mode
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
