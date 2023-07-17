import React, { useState } from "react";
import { Stack } from "@mui/material";
import { Add as AddIcon, CloudSync as CloudSyncIcon } from "@mui/icons-material";

import ButtonFit from "components/ButtonFit";
import AddBankAccountDialogDialog from "components/AddBankAccountDialog";
import BaseContainer from "components/BaseContainer";

export default function CardView() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseContainer pageTitle="Bank Accounts">
      <AddBankAccountDialogDialog isOpen={isOpen} handleClose={() => setIsOpen(false)} />

      <Stack spacing={1}>
        <Stack spacing={1} direction="row" justifyContent="space-between">
          <ButtonFit
            buttonProps={{
              variant: "outlined",
              startIcon: <AddIcon />,
              onClick: () => setIsOpen(true)
            }}
          >
            New
          </ButtonFit>
          <ButtonFit
            buttonProps={{ variant: "outlined", startIcon: <CloudSyncIcon />, disabled: true }}
          >
            Sync
          </ButtonFit>
        </Stack>
      </Stack>
    </BaseContainer>
  );
}
