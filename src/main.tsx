import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // Dùng App để chứa các route

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
