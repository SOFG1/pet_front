import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import { GlobalStateProvider } from "@reactivers/use-global-state";
import { HashRouter  } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </HashRouter >
  </React.StrictMode>
);
