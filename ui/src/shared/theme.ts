import { createTheme, ThemeOptions } from "@mui/material/styles";
import { LS_KEYS } from "shared/enum";
import { readFromStorage } from "shared/utils";

type ThemeMode = "light" | "dark";

const themeMode: ThemeMode =
  readFromStorage<ThemeMode, ThemeMode>({
    key: LS_KEYS.themeMode,
    fallbackValue: "dark"
  }) ?? "dark";

// TODO: Move to a separate file, use from local storage
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
