import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AppProvider } from "contexts/App";
import { AuthProvider } from "contexts/Auth";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

console.log(
  "%cDon't run 3rd-party scripts or paste code which u dont understand while using this app!",
  "color: red; font-size: 18px"
);

console.log(
  // eslint-disable-next-line max-len
  "%cThe data stored is financially related & is considered extremely sensitive. Prevent your data from being stolen.",
  "color: red; font-size: 18px"
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
