import React, { useRef } from "react";
import Snackbar from "components/Snackbar";

import { TOAST_AUTO_HIDE_DURATION } from "shared/enum";
import type { AlertProps } from "@mui/material";

export default function useToast(defaultDuration = TOAST_AUTO_HIDE_DURATION) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const type = useRef<AlertProps["severity"]>("info");
  const duration = useRef<number>(defaultDuration);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleOpen = (
    message: string,
    alertType: AlertProps["severity"] = "info",
    autoCloseAfter: number = defaultDuration
  ) => {
    if (open) handleClose();

    autoCloseAfter && (duration.current = autoCloseAfter);

    type.current = alertType;
    setMessage(message);
    setOpen(true);
  };

  const Toast = () => (
    <Snackbar
      open={open}
      type={type.current}
      handleClose={handleClose}
      message={message}
      hideAfter={duration.current}
    />
  );

  const ToastWithCloseButton = () => (
    <Snackbar
      open={open}
      type={type.current}
      handleClose={handleClose}
      message={message}
      hideAfter={duration.current}
      showCloseButton
    />
  );

  return {
    Toast,
    ToastWithCloseButton,
    showToast: handleOpen
  };
}
