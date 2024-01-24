import React, { createContext, useState, useCallback } from "react";

import useToast from "hooks/useToast";
import APP_THEME from "shared/theme";
import { getAppSettings } from "shared/helpers";
import LoadingOverlay from "components/LoadingOverlay";

import type { AlertProps } from "@mui/material";

export const AppContext = createContext({
  /* eslint-disable */
  appTheme: [APP_THEME, (theme: typeof APP_THEME) => {}] as const,
  appSettings: [getAppSettings(), (settings: AppSettings) => {}] as const,
  showToast: (message: string, alertType?: AlertProps["severity"], autoCloseAfter?: number) => {},
  showLoadingOverlay: () => {},
  hideLoadingOverlay: () => {}
  /* eslint-enable */
});

export type AppProviderProps = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<typeof APP_THEME>(APP_THEME);
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast, ToastWithCloseButton } = useToast();

  const showLoadingOverlay = useCallback(() => setIsLoading(true), []);
  const hideLoadingOverlay = useCallback(() => setIsLoading(false), []);

  return (
    <AppContext.Provider
      value={{
        appTheme: [theme, setTheme],
        appSettings: [settings, setSettings],
        showLoadingOverlay,
        hideLoadingOverlay,
        showToast
      }}
    >
      <ToastWithCloseButton />
      <LoadingOverlay loading={isLoading} />
      {children}
    </AppContext.Provider>
  );
}
