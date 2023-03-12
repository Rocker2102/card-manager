import React from "react";
import { ThemeProvider } from "@mui/system";
import { RouterProvider } from "react-router-dom";

import APP_THEME from "shared/theme";
import APP_ROUTER from "shared/router";
import { AppProvider } from "contexts/App";

console.log("APP_THEME", APP_THEME);

export default function App() {
  return (
    <ThemeProvider theme={APP_THEME}>
      <AppProvider>
        <RouterProvider router={APP_ROUTER} />
      </AppProvider>
    </ThemeProvider>
  );
}
