import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
const element = document.getElementById("root") ?? document.createElement("div");
const root = ReactDOM.createRoot(element);
root.render(<App />);
