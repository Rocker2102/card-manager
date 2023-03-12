import { createTheme, ThemeOptions } from "@mui/material/styles";

// Create a theme instance. TODO: Move to a separate file, use from local storage
const THEME: ThemeOptions = {
  palette: {
    mode: "dark"
  }
};

export default createTheme(THEME);
