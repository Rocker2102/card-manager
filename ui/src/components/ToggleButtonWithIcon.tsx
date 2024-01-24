import React from "react";
import Typography from "@mui/material/Typography";
import MuiToggleButton from "@mui/material/ToggleButton";

import type { ToggleButtonProps as MuiToggleButtonProps } from "@mui/material";

interface ToggleButtonProps extends MuiToggleButtonProps {
  icon: React.ReactNode;
  text: string;
}

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
