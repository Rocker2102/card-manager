import React, { createContext, useState } from "react";

import APP_THEME from "shared/theme";
import { getAppSettings } from "shared/helpers";

export const AppContext = createContext({
  /* eslint-disable */
  appTheme: [APP_THEME, (theme: typeof APP_THEME) => {}] as const,
  appSettings: [getAppSettings(), (settings: AppSettings) => {}] as const
  /* eslint-enable */
});

export type AppProvider = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: AppProvider) {
  const [theme, setTheme] = useState<typeof APP_THEME>(APP_THEME);
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());

  return (
    <AppContext.Provider
      value={{
        appTheme: [theme, setTheme],
        appSettings: [settings, setSettings]
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
