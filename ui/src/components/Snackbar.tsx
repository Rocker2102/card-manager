import React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import MuiSnackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

import { TOAST_AUTO_HIDE_DURATION } from "shared/enum";

import type { AlertProps } from "@mui/material";

const MARGIN_BOTTOM = 72;

type SnackbarProps = {
  open: boolean;
  type?: AlertProps["severity"];
  hideAfter?: number;
  message: string;
  showCloseButton?: boolean;
  handleClose: () => void;
};

export default function Snackbar({
  open,
  type = "info",
  hideAfter = TOAST_AUTO_HIDE_DURATION,
  message,
  showCloseButton = true,
  handleClose
}: SnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={hideAfter}
      onClose={handleClose}
      action={
        showCloseButton ? (
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : null
      }
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ bottom: { xs: MARGIN_BOTTOM } }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
