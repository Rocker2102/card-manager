import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { AppContext } from "contexts/App";
import LoadingComponent from "components/LoadingComponent";

import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddBankAccountDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function AddBankAccountDialogDialog({
  isOpen,
  handleClose
}: AddBankAccountDialogProps) {
  const { appSettings } = useContext(AppContext);
  const [saving, setSaving] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const [settings] = appSettings;

  const handleSave = async () => {
    if (saving) {
      setHasErrors(true);
      setTimeout(() => {
        setHasErrors(false);
      }, 2000);
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      handleClose();
    }, 2000);
  };

  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add new bank account
            </Typography>

            <LoadingComponent
              isLoading={saving}
              component={
                <Button color="inherit" disabled={hasErrors} onClick={handleSave}>
                  Save
                </Button>
              }
            />
          </Toolbar>
        </AppBar>

        <form>
          <Grid container spacing={2} marginTop={2} sx={{ p: 2 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="bank-name">Bank Name *</InputLabel>
                <Select labelId="bank-name" label="Bank Name" required>
                  <MenuItem value={10}>HDFC</MenuItem>
                  <MenuItem value={20}>ICICI</MenuItem>
                  <MenuItem value={30}>Yes Bank</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <FormControl fullWidth>
                <TextField required label="Account number" defaultValue="" />
              </FormControl>
            </Grid>

            <Grid item xs={7}>
              <FormControl fullWidth>
                <TextField label="IFSC Code" defaultValue="" />
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth>
                <TextField label="MMID" defaultValue="" />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField label="Account Holder's Name" defaultValue="" />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField label="Nominee" defaultValue="" />
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 3, mb: 3 }} />

          <Typography variant="h5" gutterBottom mt={2} mx={2} mb={0}>
            More options
          </Typography>

          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="link-existing-name">Link existing cards</InputLabel>
                <Select labelId="link-existing-name" label="Link existing cards" required>
                  <MenuItem value={10}>HDFC Milennia - 0044</MenuItem>
                  <MenuItem value={20}>HDFC Regalia - 0527</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="success" />}
                disabled={!settings.firebaseAdded}
                label="Sync with cloud"
              />

              {!settings.firebaseAdded && (
                <Typography variant="caption" display="block" color="warning.main">
                  Firebase sync is not configured! Configure it in settings to enable this feature.
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="outlined"
                size="large"
                color="secondary"
                disabled={hasErrors || saving}
                onClick={handleSave}
              >
                {saving ? "Saving" : "Save Account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
}
