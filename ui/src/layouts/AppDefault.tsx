import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useMatches, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Box, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import { hasAnyUserRegistered } from "database/userService";
import { AuthContext } from "contexts/Auth";
import LoginView from "views/Login";
import ErrorView from "views/Error";
import WelcomeView from "views/Welcome";
import { AUTH_ROUTE_PREFIX, QUERY_STATUS } from "shared/enum";
import { ROUTES, ROUTE_COMPONENTS, MENU_OPTIONS } from "shared/routes";

export default function AppDefaultLayout() {
  const { loggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [firstMatch] = useMatches();
  const [userExists, setUserExists] = useState<keyof QueryStatus>(QUERY_STATUS.LOADING);
  const [path, setPath] = useState<string>(firstMatch?.pathname || "/");

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: string) => {
    if (newValue !== path) {
      setPath(newValue);
      navigate(newValue);
    }
  };

  const checkUserStatus = async () => {
    const user = await hasAnyUserRegistered();
    setUserExists(user ? QUERY_STATUS.SUCCESS : QUERY_STATUS.ERROR);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <Layout>
      <Content component="div" sx={{ bgcolor: "background.default" }}>
        <Routes>
          {loggedIn &&
            ROUTES.map(({ key, path }) => (
              <Route
                key={key}
                path={`${AUTH_ROUTE_PREFIX}${path}`}
                element={ROUTE_COMPONENTS[key]}
              />
            ))}

          {!loggedIn && userExists === QUERY_STATUS.SUCCESS && (
            <Route path="*" element={<LoginView />}></Route>
          )}

          {!loggedIn && userExists === QUERY_STATUS.ERROR && (
            <Route path="*" element={<WelcomeView />}></Route>
          )}

          {loggedIn && <Route path="*" element={<ErrorView />}></Route>}
        </Routes>
      </Content>

      {loggedIn && (
        <Paper elevation={3}>
          <BottomNavigation value={path} onChange={handleChange}>
            {Object.keys(MENU_OPTIONS).map(actionPath => (
              <BottomNavigationAction
                key={actionPath}
                label={MENU_OPTIONS[actionPath].label}
                value={`${AUTH_ROUTE_PREFIX}${actionPath}`}
                icon={MENU_OPTIONS[actionPath].icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const Content = styled(Box)`
  padding: 0 20px;

  @media (max-width: 480px) {
    padding: 0 5px;
  }

  @media (max-width: 680px) {
    padding: 0 10px;
  }
`;
