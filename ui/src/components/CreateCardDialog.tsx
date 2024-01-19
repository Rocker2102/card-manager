import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { Close as CloseIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { AppContext } from "contexts/App";
import CreditCard from "./CreditCard";
import LoadingComponent from "components/LoadingComponent";
import { addCreditCardSchema } from "shared/formSchemas";
import capitalize from "helpers/capitalize";
import prependZero from "helpers/prependZero";
import { CARD_MIN_VALID_YEAR, CARD_MAX_VALID_YEAR, CARD_TYPES, MONTHS } from "shared/enum";

import type { TransitionProps } from "@mui/material/transitions";
import type { AddCardInput } from "typings/forms";
import type { Card } from "database/types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DEFAULT_CARD_TYPE = "credit";
const YEARS = Array.from(
  { length: CARD_MAX_VALID_YEAR - CARD_MIN_VALID_YEAR },
  (_, index) => CARD_MIN_VALID_YEAR + index
);

type CreateProps = {
  isOpen: boolean;
  title: string;
  handleClose: () => void;
  handleSave: (data: AddCardInput) => Promise<void>;
};

type EditProps = CreateProps & {
  card: Card;
  isEditing: boolean;
  handleUpdate: (data: AddCardInput) => Promise<void>;
};

type CreateCardDialogProps = CreateProps | EditProps;

export default function CreateCardDialog(props: CreateCardDialogProps) {
  const { isOpen, handleClose, title, handleSave } = props;

  const { appSettings } = useContext(AppContext);
  const [saving, setSaving] = useState<boolean>(false);
  const [showCvv, setShowCvv] = useState<boolean>(false);

  const { control, formState, handleSubmit, watch, setValue, register, reset } =
    useForm<AddCardInput>({
      mode: "onSubmit",
      resolver: joiResolver(addCreditCardSchema),
      defaultValues: {
        cardType: DEFAULT_CARD_TYPE,
        syncWithCloud: false
      }
    });

  const [settings] = appSettings;

  const onSubmit: SubmitHandler<AddCardInput> = async (data: AddCardInput) => {
    try {
      setSaving(true);

      if ((props as EditProps).isEditing) {
        await (props as EditProps).handleUpdate(data);
      } else {
        await handleSave(data);
      }

      reset();
      handleClose();
    } catch {
      console.log("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if ((props as EditProps).isEditing) {
      const editProps = props as EditProps;

      setValue("cardType", editProps.card.type);
      setValue("cardNumber", editProps.card.number);
      setValue("holdersName", editProps.card.holdersName);
      setValue("cvv", editProps.card.cvv);
      setValue("expiryMonth", editProps.card.expiry.month);
      setValue("expiryYear", editProps.card.expiry.year);
      setValue("syncWithCloud", editProps.card.syncEnabled);
    } else {
      reset();
    }
  }, [(props as EditProps).isEditing]);

  const handleClickShowCvv = () => setShowCvv(show => !show);

  const handleMouseDownCvv = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleNumberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const nativeEvent = event.nativeEvent as InputEvent;

    if (nativeEvent.data && !/^\d+$/.test(nativeEvent.data)) {
      return setValue("cardNumber", value.slice(0, -1));
    }
  };

  const handleNumberPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    const nativeEvent = event.nativeEvent;

    if (nativeEvent.clipboardData) {
      const pastedData = nativeEvent.clipboardData.getData("text/plain");

      if (/^\d+$/.test(pastedData) && value.length + pastedData.length <= 16) {
        return setValue("cardNumber", pastedData);
      }

      return event.preventDefault();
    }
  };

  return (
    <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
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

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={2} marginTop={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Card Number *"
                type="text"
                inputProps={{
                  maxLength: "16",
                  onPaste: handleNumberPaste,
                  ...register("cardNumber", {
                    onChange: handleNumberInput
                  })
                }}
                error={Boolean(formState.errors.cardNumber)}
                helperText={formState.errors.cardNumber?.message}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Holder's Name *"
                inputProps={{ ...register("holdersName") }}
                error={Boolean(formState.errors.holdersName)}
                helperText={formState.errors.holdersName?.message}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} md={3}>
            <FormControl fullWidth error={!!formState.errors.cardType}>
              <InputLabel id="card-type-label">Card Type *</InputLabel>
              <Select
                labelId="card-type-label"
                id="card-type"
                label="Card Type *"
                inputProps={{ ...register("cardType") }}
                value={watch("cardType") || ""}
              >
                {CARD_TYPES.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {capitalize(type)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{formState.errors.cardType?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={3}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                label="CVV *"
                type={showCvv ? "text" : "password"}
                error={Boolean(formState.errors.cvv)}
                helperText={formState.errors.cvv?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCvv}
                        onMouseDown={handleMouseDownCvv}
                        edge="end"
                      >
                        {showCvv ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                inputProps={{ maxLength: "4", ...register("cvv") }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} display="flex" justifyContent="space-between">
            <Grid item xs={5}>
              <FormControl fullWidth error={!!formState.errors.expiryYear}>
                <InputLabel id="card-type-label">Expiry Month *</InputLabel>
                <Select
                  labelId="card-expiry-month-label"
                  id="card-expiry-month"
                  label="Expiry Month *"
                  inputProps={{ ...register("expiryMonth") }}
                  value={watch("expiryMonth") || ""}
                >
                  {MONTHS.map((month, index) => (
                    <MenuItem key={month} value={index + 1}>
                      {`${prependZero(index + 1)}`} - {month}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formState.errors.expiryMonth?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={1} display="flex" justifyContent="center" alignItems="center">
              /
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth error={!!formState.errors.expiryYear}>
                <InputLabel id="card-type-label">Expiry Year *</InputLabel>
                <Select
                  labelId="card-expiry-year-label"
                  id="card-expiry-year"
                  label="Expiry Year *"
                  inputProps={{ ...register("expiryYear") }}
                  value={watch("expiryYear") || ""}
                >
                  {YEARS.map((year, index) => (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formState.errors.expiryYear?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={1} display="flex" justifyContent="flex-start">
            <CreditCard
              type={watch("cardType")}
              number={watch("cardNumber")}
              name={watch("holdersName")}
              cvv={watch("cvv")}
              expiry={
                prependZero(watch("expiryMonth", 0) || 0) +
                "/" +
                prependZero(watch("expiryYear", 0) || 0).slice(-2)
              }
            />
          </Grid>
        </Grid>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Typography variant="h5" gutterBottom mt={2} mx={2} mb={0}>
          More options
        </Typography>

        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} md={4}></Grid>

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
              {saving ? "Saving" : "Save Card"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}
