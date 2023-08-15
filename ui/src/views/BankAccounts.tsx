import React, { useState } from "react";
import { Stack } from "@mui/material";
import { Add as AddIcon, CloudSync as CloudSyncIcon } from "@mui/icons-material";

import ButtonFit from "components/ButtonFit";
import AddBankAccountDialogDialog from "components/AddBankAccountDialog";
import BaseContainer from "components/BaseContainer";

import type { AddBankAccountInput } from "typings/forms";

export default function BankAccountsView() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewBankAccountCreation = async (data: AddBankAccountInput) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <BaseContainer pageTitle="Bank Accounts">
      <AddBankAccountDialogDialog
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleSave={handleNewBankAccountCreation}
      />

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
