import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  /* eslint-disable */
  loggedIn: false,
  login: () => {},
  logout: () => {},
  isLoggedIn: () => {},
  getUserData: () => {},
  setUserData: (userData: AuthUser | null) => {}
  /* eslint-enable */
});

export type AuthProviderProps = {
  children?: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<AuthUser | null>(null);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const isLoggedIn = () => loggedIn;

  const getUserData = () => userData;

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login,
        logout,
        isLoggedIn,
        getUserData,
        setUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
