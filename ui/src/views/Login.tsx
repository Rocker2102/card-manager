import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import PinInput from "components/PinInput";

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const pin = data.get("pin")?.toString().trim();

    if (!pin) return;

    console.log("You entered:", pin);
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
            id="pin"
            inputProps={{ max: 99999 }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Confirm
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
