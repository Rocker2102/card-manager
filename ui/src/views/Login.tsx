import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import PinInput from "components/PinInput";

interface LoginViewProps {
  handleLogin: (pin: string) => Promise<void>;
}

export default function LoginView({ handleLogin }: LoginViewProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const pin = data.get("pin")?.toString().trim();

    if (!pin) return;

    try {
      setError("");
      setLoading(true);
      await handleLogin(pin);
    } catch (error) {
      setError((error as Error).message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" width="100%" height="100%">
      <Grid item lg={4} md={6} xs={10} xl={3}>
        <Avatar sx={{ m: "auto", my: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" textAlign="center">
          Enter you PIN
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <PinInput
            margin="normal"
            fullWidth
            name="pin"
            label="Pin"
            type="number"
            inputProps={{ max: 99999 }}
            error={Boolean(error)}
            helperText={error}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Checking" : "Confirm"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
