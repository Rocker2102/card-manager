import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Box, Typography, ToggleButtonGroup } from "@mui/material";

import { LS_KEYS } from "shared/enum";
import { AppContext } from "contexts/App";
import { writeToStorage } from "shared/utils";
import BaseContainer from "components/BaseContainer";
import ToggleButton from "components/ToggleButtonWithIcon";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";

import type { ThemeMode } from "shared/theme";

export default function CardView() {
  const { appTheme } = useContext(AppContext);
  const [theme] = appTheme;
  const [themeMode, setThemeMode] = useState<ThemeMode>(theme.palette.mode);

  const handleThemeChange = (
    event: React.MouseEvent<HTMLElement>,
    newThemeMode: null | ThemeMode
  ): void => {
    if (!newThemeMode || themeMode === newThemeMode) return;

    writeToStorage({ key: LS_KEYS.themeMode, value: newThemeMode });
    setThemeMode(newThemeMode);
  };

  return (
    <BaseContainer pageTitle="Settings">
      <StyledBox>
        <Typography variant="overline" display="block">
          Theme
        </Typography>

        <ToggleButtonGroup
          color="primary"
          value={themeMode}
          exclusive
          size="large"
          onChange={handleThemeChange}
          aria-label="Theme Mode"
        >
          <ToggleButton icon={<LightModeIcon />} text="Light" value="light" />
          <ToggleButton icon={<DarkModeIcon />} text="Dark" value="dark" />
        </ToggleButtonGroup>

        {theme.palette.mode !== themeMode && (
          <Typography variant="caption" color="error.main" display="block" mt={1}>
            You will see the changes the next time you open the app.
          </Typography>
        )}
      </StyledBox>
    </BaseContainer>
  );
}

const StyledBox = styled(Box)`
  text-align: left;
`;
