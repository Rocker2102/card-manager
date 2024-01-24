import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type LoadingComponentProps = {
  isLoading: boolean;
  component: React.ReactElement;
  size?: string;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

export default function LoadingComponent({
  isLoading,
  size = "2em",
  color = "warning",
  component
}: LoadingComponentProps) {
  return isLoading ? <CircularProgress size={size} color={color} /> : <> {component} </>;
}
