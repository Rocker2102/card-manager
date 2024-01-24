import React, { useContext } from "react";
import { ThemeProvider } from "@mui/system";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";

import APP_ROUTER from "shared/router";
import { AppContext } from "contexts/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  const { appTheme } = useContext(AppContext);
  const [theme] = appTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={APP_ROUTER} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
