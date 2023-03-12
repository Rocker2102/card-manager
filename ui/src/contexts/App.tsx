import React, { createContext } from "react";

export const AppContext = createContext({});

export type AppProvider = {
  children?: React.ReactNode;
};

export function AppProvider({ children }: AppProvider) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}
