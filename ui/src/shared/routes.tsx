import React from "react";
import {
  CreditCard as CreditCardIcon,
  SettingsOutlined as SettingsIcon,
  AccountBalanceOutlined as AccountBalanceIcon
} from "@mui/icons-material";

import CardView from "views/Cards";
import SettingsView from "views/Settings";
import BankAccountsView from "views/BankAccounts";

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
    path: "/cards",
    key: "cards"
  },
  {
    path: "/settings",
    key: "settings"
  },
  {
    path: "/bank-accounts",
    key: "bank-accounts"
  }
];

export const ROUTE_COMPONENTS: RouteComponents = {
  cards: <CardView />,
  settings: <SettingsView />,
  "bank-accounts": <BankAccountsView />
};

// Order of the routes in the menu
export const MENU_OPTIONS: MenuOptions = {
  "/cards": {
    icon: <CreditCardIcon />,
    label: "Cards"
  },
  "/bank-accounts": {
    icon: <AccountBalanceIcon />,
    label: "Accounts"
  },
  "/settings": {
    icon: <SettingsIcon />,
    label: "Settings"
  }
};
