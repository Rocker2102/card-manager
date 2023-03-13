import { createTheme, ThemeOptions } from "@mui/material/styles";

import { getThemeMode } from "shared/helpers";

const themeMode = getThemeMode();

const theme: ThemeOptions = {
  palette: {
    mode: themeMode,
    background: {
      default: themeMode === "dark" ? "#202122" : "#f5f5f5",
      paper: themeMode === "dark" ? "#2c2c2e" : "#fff"
    }
  }
};

export default createTheme(theme);
