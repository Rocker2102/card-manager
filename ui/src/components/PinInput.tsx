import React from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

import type { TextFieldProps } from "@mui/material/TextField";

type PinInputProps = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function PinInput({ inputProps = {}, ...props }: PinInputProps & TextFieldProps) {
  return <StyledInput inputProps={{ pattern: "\\d*", min: 0, ...inputProps }} {...props} />;
}

const StyledInput = styled(TextField)`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
