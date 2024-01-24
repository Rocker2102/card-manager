import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorView from "views/Error";
import AppDefaultLayout from "layouts/AppDefault";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <AppDefaultLayout />,
    errorElement: <ErrorView />
  }
]);

export default router;
