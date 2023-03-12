import React from "react";
import styled from "@emotion/styled";
import { Box, Divider as MuiDivider, Typography } from "@mui/material";

import type { Theme } from "@mui/system";

type BaseContainerProps = {
  children?: React.ReactNode;
  pageTitle?: string;
};

// FIXME: Remove typescript error
export default function BaseContainer({ children, pageTitle }: BaseContainerProps) {
  return (
    <StyledBox mt={2}>
      {pageTitle && (
        <>
          <Typography variant="h4" textTransform="capitalize" mb={2}>
            {pageTitle}
          </Typography>

          <Divider />
        </>
      )}

      {children}
    </StyledBox>
  );
}

const StyledBox = styled(Box)`
  text-align: center;
`;

const Divider = styled(MuiDivider)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2)
}));
