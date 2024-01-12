import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDivider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import type { Theme } from "@mui/system";

type BaseContainerProps = {
  children?: React.ReactNode;
  pageTitle?: string;
};

export default function BaseContainer({ children, pageTitle }: BaseContainerProps) {
  return (
    <Box mt={pageTitle ? 0 : 2}>
      {pageTitle && (
        <Header sx={{ bgcolor: "background.default" }}>
          <Typography textAlign="center" variant="h4" textTransform="capitalize" mb={2}>
            {pageTitle}
          </Typography>

          <Divider />
        </Header>
      )}

      {children}
    </Box>
  );
}

const Header = styled("header")({
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
  paddingTop: "0.75rem"
});

const Divider = styled(MuiDivider)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2)
}));
