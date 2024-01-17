import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CopyIcon from "@mui/icons-material/ContentCopyRounded";

import type { Variant } from "@mui/material/styles/createTypography";

type ContentRowProps = {
  value: string;
  title?: string;
  inline?: boolean;
  variant?: Variant;
  copyValue?: string;
};

// TODO: Add option to display masked value
/**
 * @description A row of content with a title (optional), value & a copy button (optional).
 * Only the value is copied when the copy button is clicked
 */
export default function ContentRow({
  value,
  title,
  inline = false,
  variant = "body2",
  copyValue
}: ContentRowProps) {
  const onCopyClick = () => {
    navigator.clipboard.writeText(copyValue as string);
  };

  return (
    <div style={{ display: inline ? "inline" : "block" }}>
      {title && (
        <Typography sx={{ display: "inline", fontWeight: "bold" }} variant={variant}>
          {title}: &nbsp;
        </Typography>
      )}

      <Typography sx={{ display: "inline" }} variant={variant}>
        {value}
      </Typography>

      {copyValue && (
        <IconButton aria-label="Copy text" size="small" sx={{ ml: 0.5 }} onClick={onCopyClick}>
          <CopyIcon fontSize="inherit" />
        </IconButton>
      )}
    </div>
  );
}
