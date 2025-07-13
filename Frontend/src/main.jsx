import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SIGN_IN_REDIRECT = import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL;
const SIGN_UP_REDIRECT = import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInForceRedirectUrl={SIGN_IN_REDIRECT}
      signUpForceRedirectUrl={SIGN_UP_REDIRECT}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
