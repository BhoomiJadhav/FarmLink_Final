import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <GoogleOAuthProvider clientId="958753973066-oo8vecdfj29u1js3ie4n0stm5h1u0g2q.apps.googleusercontent.com">
      <Toaster position="top-right" />
      <App />
    </GoogleOAuthProvider>
  </HelmetProvider>,
);
