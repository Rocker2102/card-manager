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
  },
  /**
   * @see https://mui.com/material-ui/react-use-media-query/
   */
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true
      }
    }
  }
};

export default createTheme(theme);
