import React, { useContext } from "react";
import { ThemeProvider } from "@mui/system";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import APP_ROUTER from "shared/router";
import { AppContext } from "contexts/App";

export default function App() {
  const { appTheme } = useContext(AppContext);
  const [theme] = appTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <RouterProvider router={APP_ROUTER} />
    </ThemeProvider>
  );
}
