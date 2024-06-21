import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import { GlobalStateProvider } from "@reactivers/use-global-state";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/pet_front">
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </BrowserRouter>
  </React.StrictMode>
);