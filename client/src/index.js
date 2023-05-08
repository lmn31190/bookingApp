import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchReducerProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchReducerProvider>
        <App />
      </SearchReducerProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
