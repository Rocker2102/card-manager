import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import FormHelperText, { FormHelperTextProps } from "@mui/material/FormHelperText";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

type OptionType = {
  [id: string]: string;
};

type MultiSelectProps = {
  options: OptionType;
  labelId: string;
  name?: string;
  label: string;
  selected: string[];
  setSelected: (arr: string[]) => void;
  helperText?: string;
  helperTextProps?: FormHelperTextProps;
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
};

export default function MultiSelect({
  options,
  label,
  labelId,
  name = undefined,
  helperText = undefined,
  selected,
  setSelected,
  helperTextProps = {},
  formControlProps = {},
  selectProps = {}
}: MultiSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value }
    } = event;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl {...formControlProps}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...selectProps}
        labelId={labelId}
        label={label}
        multiple
        name={name}
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={selected => selected.map(id => options[id]).join(", ")}
        MenuProps={MenuProps}
        defaultValue={[]}
      >
        {Object.keys(options).map((id: string) => (
          <MenuItem key={id} value={id}>
            <Checkbox checked={selected.indexOf(id) > -1} />
            <ListItemText primary={options[id]} />
          </MenuItem>
        ))}
      </Select>

      <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
    </FormControl>
  );
}
