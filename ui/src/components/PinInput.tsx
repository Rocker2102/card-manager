import React from "react";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

import type { TextFieldProps } from "@mui/material/TextField";

interface PinInputProps {
  props: TextFieldProps;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function PinInput({ props, inputProps }: PinInputProps) {
  return <StyledInput {...props} inputProps={{ pattern: "\\d*", min: 0, ...inputProps }} />;
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
