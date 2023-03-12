import React, { createContext, useState } from "react";

import APP_THEME from "shared/theme";

export const AppContext = createContext({
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  appTheme: [APP_THEME, (theme: typeof APP_THEME) => {}] as const
});

export type AppProvider = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: AppProvider) {
  const [theme, setTheme] = useState<typeof APP_THEME>(APP_THEME);

  return (
    <AppContext.Provider
      value={{
        appTheme: [theme, setTheme]
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
