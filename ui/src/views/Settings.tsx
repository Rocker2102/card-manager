import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Checkbox, Typography, FormControlLabel, ToggleButtonGroup } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";

import { AppContext } from "contexts/App";
import { saveAppSettings, saveThemeMode } from "shared/helpers";
import BaseContainer from "components/BaseContainer";
import ToggleButton from "components/ToggleButtonWithIcon";

export default function CardView() {
  const { appTheme, appSettings } = useContext(AppContext);
  const [theme] = appTheme;
  const [settings, setSettings] = appSettings;
  const [themeMode, setThemeMode] = useState<ThemeMode>(theme.palette.mode);
  const [firebaseAdded, setFirebaseAdded] = useState<boolean>(settings.firebaseAdded);

  console.log("Settings.tsx: ", settings, firebaseAdded);

  const handleThemeChange = (
    event: React.MouseEvent<HTMLElement>,
    newThemeMode: null | ThemeMode
  ): void => {
    if (!newThemeMode || themeMode === newThemeMode) return;

    setThemeMode(newThemeMode);
    saveThemeMode(newThemeMode);
  };

  const handleSettingsChange = (name: keyof AppSettings, newValue: boolean): void => {
    const newSettings = { ...settings, [name]: newValue };
    setSettings(newSettings);
    saveAppSettings(newSettings);
  };

  return (
    <BaseContainer pageTitle="Settings">
      <Stack spacing={1}>
        <StyledDiv>
          <Typography variant="overline" display="block">
            Theme
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={themeMode}
            exclusive
            onChange={handleThemeChange}
            aria-label="Theme Mode"
          >
            <ToggleButton icon={<LightModeIcon />} text="Light" value="light" />
            <ToggleButton icon={<DarkModeIcon />} text="Dark" value="dark" />
          </ToggleButtonGroup>

          <Typography variant="caption" color="error.main" display="block" mt={1}>
            {theme.palette.mode !== themeMode ? (
              "You will see the changes the next time you open the app."
            ) : (
              <>&nbsp;</>
            )}
          </Typography>
        </StyledDiv>

        <StyledDiv>
          <FormControlLabel
            control={
              <Checkbox
                checked={settings.analytics}
                onChange={() => handleSettingsChange("analytics", !settings.analytics)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={`Analytics ${settings.analytics ? "enabled" : "disabled"}`}
          />
          <Typography variant="caption" color="warning.main" display="block">
            {settings.analytics ? (
              "No personal or confidential data is ever sent, stored or tracked."
            ) : (
              <>&nbsp;</>
            )}
          </Typography>
        </StyledDiv>

        <StyledDiv>
          <FormControlLabel
            control={
              <Checkbox
                checked={firebaseAdded}
                onChange={() => setFirebaseAdded(!firebaseAdded)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              <Typography
                variant="body1"
                color={firebaseAdded ? "body" : "error.main"}
                display="block"
              >
                {firebaseAdded ? "Syncing with firebase" : "Firebase sync is off"}
              </Typography>
            }
          />

          {firebaseAdded && (
            <Typography
              variant="caption"
              color={settings.firebaseAdded ? "success.main" : "warning.main"}
              display="block"
            >
              {settings.firebaseAdded ? "Configuration present" : "Not configured"}
            </Typography>
          )}
        </StyledDiv>
      </Stack>
    </BaseContainer>
  );
}

const StyledDiv = styled("div")`
  text-align: left;
`;
