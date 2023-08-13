import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { AppContext } from "contexts/App";
import MultiSelect from "components/MultiSelect";
import LoadingComponent from "components/LoadingComponent";
import { addBankAccountSchema } from "shared/formSchemas";

import CloseIcon from "@mui/icons-material/Close";

import type { TransitionProps } from "@mui/material/transitions";
import type { AddBankAccountInput } from "typings/forms";

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
  handleSave: (data: AddBankAccountInput) => Promise<void>;
}

const options = {
  "1": "HDFC Millenia - XX 2726",
  "2": "SBI Cashback - XX 1216"
};

export default function AddBankAccountDialogDialog({
  isOpen,
  handleClose,
  handleSave
}: AddBankAccountDialogProps) {
  const { appSettings } = useContext(AppContext);
  const [saving, setSaving] = useState<boolean>(false);

  const { control, formState, handleSubmit, setValue, register, reset } =
    useForm<AddBankAccountInput>({
      mode: "onSubmit",
      resolver: joiResolver(addBankAccountSchema),
      defaultValues: {
        bankName: "",
        syncWithCloud: false,
        linkCards: []
      }
    });

  const [settings] = appSettings;
  const [linkedCards, setLinkedCards] = useState<string[]>([]);

  const onSubmit: SubmitHandler<AddBankAccountInput> = async (data: AddBankAccountInput) => {
    try {
      setSaving(true);
      await handleSave(data);

      reset();
      setLinkedCards([]);
      handleClose();
    } catch {
      console.log("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleLinkCardsChange = (arr: string[]) => {
    setLinkedCards(arr);
    setValue("linkCards", arr);
  };

  return (
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
              <Button color="inherit" disabled={saving} onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            }
          />
        </Toolbar>
      </AppBar>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} marginTop={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="bank-name">Bank Name *</InputLabel>
              <Select
                labelId="bank-name"
                label="Bank Name *"
                inputProps={{ ...register("bankName") }}
                defaultValue=""
                error={Boolean(formState.errors.bankName)}
              >
                <MenuItem value="HDFC">HDFC</MenuItem>
                <MenuItem value="ICICI">ICICI</MenuItem>
                <MenuItem value="Yes Bank">Yes Bank</MenuItem>
              </Select>
              <FormHelperText error={Boolean(formState.errors.bankName)}>
                {formState.errors.bankName?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <TextField
                label="Account number *"
                type="number"
                inputProps={{ pattern: "\\d*", min: 0, ...register("accountNumber") }}
                error={Boolean(formState.errors.accountNumber)}
                helperText={formState.errors.accountNumber?.message}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Account Holder's Name *"
                inputProps={{ ...register("accountHoldersName") }}
                error={Boolean(formState.errors.accountHoldersName)}
                helperText={formState.errors.accountHoldersName?.message}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Nominee"
                inputProps={{ ...register("nomineesName") }}
                error={Boolean(formState.errors.nomineesName)}
                helperText={formState.errors.nomineesName?.message}
              />
            </FormControl>
          </Grid>

          <Grid item xs={7}>
            <FormControl fullWidth>
              <TextField
                label="IFSC Code"
                inputProps={{ ...register("ifscCode") }}
                error={Boolean(formState.errors.ifscCode)}
                helperText={formState.errors.ifscCode?.message}
              />
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <FormControl fullWidth>
              <TextField
                label="MMID"
                inputProps={{ ...register("mmid") }}
                error={Boolean(formState.errors.mmid)}
                helperText={formState.errors.mmid?.message}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Typography variant="h5" gutterBottom mt={2} mx={2} mb={0}>
          More options
        </Typography>

        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={4}>
            <MultiSelect
              options={options}
              labelId="link-cards"
              label="Link Cards"
              helperText="Select your existing cards to link with this account"
              formControlProps={{ fullWidth: true }}
              selected={linkedCards}
              setSelected={handleLinkCardsChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name="syncWithCloud"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      color="success"
                      disabled={!settings.firebaseAdded}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              }
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
              disabled={saving}
            >
              {saving ? "Saving" : "Save Account"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}
