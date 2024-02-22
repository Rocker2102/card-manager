export const DB_NAME = "pwa_card_manager_data";
export const DB_VERSION = 1;
export const USER_DB_NAME = "pwa_card_manager_users";
export const USER_DB_VERSION = 1;

export const LS_KEY_PREFIX = "pwa_card_manager_";
export const LS_KEYS = {
  themeMode: `${LS_KEY_PREFIX}themeMode`,
  appSettings: `${LS_KEY_PREFIX}appSettings`
} as const;

export const DEFAULT_APP_SETTINGS: AppSettings = {
  analytics: false,
  firebaseAdded: false,
  firebaseConfig: null
} as const;

export const AUTH_ROUTE_PREFIX = "/auth";

export const QUERY_STATUS: QueryStatus = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
} as const;

export const DB_KEY_LENGTH = 32;
export const TOAST_AUTO_HIDE_DURATION = 3000;

export const QUERY_KEYS = {
  GET_CARDS: "cards",
  GET_USERS: "users",
  GET_BANK_ACCOUNTS: "bank-accounts"
} as const;

export const BANK_ICONS_BASE_PATH = "assets/bank_icons/";

export const CARD_TYPES = ["debit", "credit", "prepaid"] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
] as const;

export const CARD_MIN_VALID_YEAR = new Date().getFullYear();
export const CARD_MAX_VALID_YEAR = CARD_MIN_VALID_YEAR + 20;
