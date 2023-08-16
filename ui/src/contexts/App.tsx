import React, { createContext, useState } from "react";
import useToast from "hooks/useToast";

import APP_THEME from "shared/theme";
import { getAppSettings } from "shared/helpers";

import type { AlertProps } from "@mui/material";

export const AppContext = createContext({
  /* eslint-disable */
  appTheme: [APP_THEME, (theme: typeof APP_THEME) => {}] as const,
  appSettings: [getAppSettings(), (settings: AppSettings) => {}] as const,
  showToast: (message: string, alertType?: AlertProps["severity"], autoCloseAfter?: number) => {}
  /* eslint-enable */
});

export type AppProviderProps = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<typeof APP_THEME>(APP_THEME);
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const { showToast, ToastWithCloseButton } = useToast();

  return (
    <AppContext.Provider
      value={{
        appTheme: [theme, setTheme],
        appSettings: [settings, setSettings],
        showToast
      }}
    >
      <ToastWithCloseButton />
      {children}
    </AppContext.Provider>
  );
}
