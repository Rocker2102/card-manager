export const DB_NAME = "pwa_card_manager";
export const DB_VERSION = 1;
export const USER_DB_NAME = "pwa_card_manager_users";
export const USER_DB_VERSION = 1;

export const LS_KEY_PREFIX = "pwa_card_manager_";
export const LS_KEYS = {
  themeMode: `${LS_KEY_PREFIX}themeMode`,
  appSettings: `${LS_KEY_PREFIX}appSettings`
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  analytics: false,
  firebaseAdded: false,
  firebaseConfig: null
};

export const AUTH_ROUTE_PREFIX = "/auth";

export const QUERY_STATUS: QueryStatus = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export const TOAST_AUTO_HIDE_DURATION = 3000;
