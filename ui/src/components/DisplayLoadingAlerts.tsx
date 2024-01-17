import React from "react";
import Alert from "@mui/material/Alert";

type DisplayLoadingAlertsProps = {
  error: null | boolean;
  loading: boolean;
  fetching: boolean;
  dataLength: null | undefined | number;
  messages?: {
    error?: string;
    noData?: string;
    loading?: string;
  };
};

const DEFAULT_MESSAGES = {
  error: "An error ocurred while fetching data!",
  noData: "No data found!",
  loading: "Loading..."
};

export default function DisplayLoadingAlerts({
  error,
  loading,
  fetching,
  dataLength,
  messages = {}
}: DisplayLoadingAlertsProps) {
  const normalizedMessages = { ...DEFAULT_MESSAGES, ...messages };

  if (fetching) {
    return <Alert severity="info">{normalizedMessages.loading}</Alert>;
  }

  if (!loading && error) {
    return <Alert severity="error">{normalizedMessages.error}</Alert>;
  }

  if (!loading && typeof dataLength === "number" && dataLength === 0) {
    return <Alert severity="info">{normalizedMessages.noData}</Alert>;
  }

  return null;
}
