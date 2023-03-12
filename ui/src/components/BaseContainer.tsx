import React from "react";
import styled from "@emotion/styled";
import { Box, Divider, Typography } from "@mui/material";

type BaseContainerProps = {
  children?: React.ReactNode;
  pageTitle?: string;
};

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
