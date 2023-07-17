import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  id: string;
  label: string;
};

interface MultiSelectProps {
  options: OptionType[];
  labelId: string;
  name?: string;
  label: string;
}

export default function MultiSelect({
  options,
  label,
  labelId,
  name = undefined
}: MultiSelectProps) {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const {
      target: { value }
    } = event;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          multiple
          name={name}
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options.map(({ id, label }: OptionType) => (
            <MenuItem key={id} value={id}>
              <Checkbox checked={selectedOptions.indexOf(id) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
