// imported necessary libraries for react
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

// get reference of root element
const El = document.getElementById("root");

// create root using refrence of root
const root = ReactDOM.createRoot(El);

// render root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
