export const DB_NAME = "pwa_card_manager";
export const DB_VERSION = 1;

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
