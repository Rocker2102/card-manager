import React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiSnackbar from "@mui/material/Snackbar";

import { TOAST_AUTO_HIDE_DURATION } from "shared/enum";

import type { AlertProps } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  type?: AlertProps["severity"];
  hideAfter?: number;
  message: string;
  handleClose: () => void;
  showCloseButton?: boolean;
}

export default function Snackbar({
  open,
  handleClose,
  hideAfter,
  message,
  type = "info",
  showCloseButton = true
}: SnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={hideAfter || TOAST_AUTO_HIDE_DURATION}
      onClose={handleClose}
      action={
        showCloseButton ? (
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : null
      }
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
}
