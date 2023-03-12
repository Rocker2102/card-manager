import React from "react";
import { createBrowserRouter } from "react-router-dom";
import CardView from "views/Cards";
import SettingsView from "views/Settings";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <CardView />
  },
  {
    path: "/settings",
    element: <SettingsView />
  }
]);

export default ROUTER;
