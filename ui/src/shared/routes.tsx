import React from "react";
import CardView from "views/Cards";
import SettingsView from "views/Settings";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";

type Route = {
  path: string;
  key: string;
};

/**
 * Route components for each route, mapping the route key to a component
 */
type RouteComponents = {
  [key: string]: React.ReactNode;
};

/**
 * Menu options for each route, mapping the route path to menu options
 */
type MenuOptions = {
  [key: string]: {
    icon: React.ReactNode;
    label: string;
  };
};

export const ROUTES: Route[] = [
  {
    path: "/",
    key: "cards"
  },
  {
    path: "/settings",
    key: "settings"
  }
];

export const ROUTE_COMPONENTS: RouteComponents = {
  cards: <CardView />,
  settings: <SettingsView />
};

export const MENU_OPTIONS: MenuOptions = {
  "/": {
    icon: <CreditCardIcon />,
    label: "Cards"
  },
  "/settings": {
    icon: <SettingsIcon />,
    label: "Settings"
  }
};
