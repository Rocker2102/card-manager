import React from "react";
import Button from "@mui/material/Button";

import type { ButtonProps } from "@mui/material/Button";

type ButtonFitProps = {
  children?: React.ReactNode;
  buttonProps?: ButtonProps;
};

export default function ButtonFit({ children, buttonProps }: ButtonFitProps) {
  return (
    <Button sx={{ width: "fit-content" }} size="large" {...buttonProps}>
      {children}
    </Button>
  );
}
