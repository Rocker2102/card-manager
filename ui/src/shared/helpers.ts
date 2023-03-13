import { LS_KEYS, DEFAULT_APP_SETTINGS } from "shared/enum";
import { readFromStorage, writeToStorage } from "shared/utils";

export default function getAppSettings(): AppSettings {
  return (
    readFromStorage({
      key: LS_KEYS.appSettings,
      parse: true,
      fallbackValue: DEFAULT_APP_SETTINGS
    }) ?? DEFAULT_APP_SETTINGS
  );
}

export function saveAppSettings(appSettings: AppSettings): void {
  writeToStorage({
    key: LS_KEYS.appSettings,
    value: JSON.stringify(appSettings)
  });
}

export function getThemeMode(): ThemeMode {
  return (
    readFromStorage({
      key: LS_KEYS.themeMode,
      fallbackValue: "dark"
    }) ?? "dark"
  );
}

export function saveThemeMode(themeMode: ThemeMode): void {
  writeToStorage({
    key: LS_KEYS.themeMode,
    value: themeMode
  });
}
