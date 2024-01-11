import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import { addUserSchema } from "shared/formSchemas";
import PinInput from "components/PinInput";

import type { AddUser } from "typings/forms";

type WelcomeViewProps = {
  handleSave: (data: AddUser) => Promise<void>;
};

export default function WelcomeView({ handleSave }: WelcomeViewProps) {
  const [saving, setSaving] = useState<boolean>(false);

  const { formState, handleSubmit, register } = useForm<AddUser>({
    mode: "onSubmit",
    resolver: joiResolver(addUserSchema)
  });

  const onSubmit: SubmitHandler<AddUser> = async (data: AddUser) => {
    try {
      setSaving(true);
      await handleSave(data);
    } catch {
      console.log("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" width="100%" height="100%">
      <Grid item lg={4} md={6} xs={10} xl={3}>
        <Avatar sx={{ m: "auto", my: 2, bgcolor: "secondary.main" }}>
          <SupervisorAccountIcon />
        </Avatar>

        <Typography component="h1" variant="h5" textAlign="center">
          Welcome
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                label="Name"
                autoFocus
                inputProps={{ ...register("name") }}
                error={Boolean(formState.errors.name)}
                helperText={formState.errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <PinInput
                inputProps={{ max: 99999, ...register("password") }}
                required
                fullWidth
                name="password"
                label="Pin"
                type="number"
                error={Boolean(formState.errors.password)}
                helperText={formState.errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email Address"
                name="email"
                inputProps={{ ...register("email") }}
                error={Boolean(formState.errors.email)}
                helperText={formState.errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                inputProps={{ ...register("mobileNumber") }}
                error={Boolean(formState.errors.mobileNumber)}
                helperText={formState.errors.mobileNumber?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Don&apos;t worry, all your data is stored locally on your device &amp; will never be
                shared with anyone.
              </Typography>

              <br />

              <Typography variant="body2" color="text.secondary">
                Email address &amp; mobile number are optional, but can be used for syncing data to
                your configured cloud storage - only if opted in.
              </Typography>
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={saving}>
            {saving ? "Saving" : "Continue"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
