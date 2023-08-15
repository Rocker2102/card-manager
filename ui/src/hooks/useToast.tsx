import React, { useRef } from "react";
import Snackbar from "components/Snackbar";

import { TOAST_AUTO_HIDE_DURATION } from "shared/enum";

export default function useToast(defaultDuration = TOAST_AUTO_HIDE_DURATION) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const duration = useRef<number>(defaultDuration);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleOpen = (message: string, autoCloseAfter?: number) => {
    if (open) handleClose();

    autoCloseAfter && (duration.current = autoCloseAfter);

    setMessage(message);
    setOpen(true);
  };

  const Toast = () => (
    <Snackbar
      open={open}
      handleClose={handleClose}
      message={message}
      hideAfter={duration.current}
    />
  );

  const ToastWithCloseButton = () => (
    <Snackbar
      open={open}
      handleClose={handleClose}
      message={message}
      hideAfter={duration.current}
    />
  );

  return {
    Toast,
    ToastWithCloseButton,
    showToast: handleOpen
  };
}
