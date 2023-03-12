import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { RouterProvider } from "react-router-dom";

import APP_THEME from "shared/theme";
import APP_ROUTER from "shared/router";
import { AppProvider } from "contexts/App";

export default function App() {
  return (
    <>
      <CssBaseline />

      <ThemeProvider theme={APP_THEME}>
        <AppProvider>
          <RouterProvider router={APP_ROUTER} />
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
