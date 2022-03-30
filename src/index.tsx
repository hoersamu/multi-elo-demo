import React from "react";
import ReactDOM from "react-dom";
import "./styles/globals.scss";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { AlertTemplate } from "./components/alertTemplate/AlertTemplate";

const alertOptions = {
  position: positions.BOTTOM_RIGHT,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  timeout: 3000,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
