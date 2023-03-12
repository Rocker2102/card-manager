import React from "react";
import { ToggleButton as MuiToggleButton, Typography } from "@mui/material";

import type { ToggleButtonProps as MuiToggleButtonProps } from "@mui/material";

type ToggleButtonProps = MuiToggleButtonProps & {
  icon: React.ReactNode;
  text: string;
};

export default function ToggleButton({ icon, text, ...props }: ToggleButtonProps) {
  return (
    <MuiToggleButton {...props}>
      {icon}
      <Typography variant="button" component="span" ml={1}>
        {text}
      </Typography>
    </MuiToggleButton>
  );
}
