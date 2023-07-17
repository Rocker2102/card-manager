import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

type OptionType = {
  id: string | number;
  label: string;
  [key: string]: unknown;
};

interface AsyncAutoCompleteProps {
  label: string;
  asyncHandler: () => Promise<Array<OptionType>>;
}

export default function AsyncAutoComplete({ label, asyncHandler }: AsyncAutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const newOptions = await asyncHandler();

      if (active) {
        setOptions(newOptions);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={option => option.label}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
}
