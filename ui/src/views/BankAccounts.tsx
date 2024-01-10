import React, { useState } from "react";
import { Stack } from "@mui/material";
import { Add as AddIcon, CloudSync as CloudSyncIcon } from "@mui/icons-material";

import { v4 } from "uuid";
import { addAccount } from "database/bankAccountService";
import ButtonFit from "components/ButtonFit";
import AddBankAccountDialogDialog from "components/AddBankAccountDialog";
import BaseContainer from "components/BaseContainer";

import type { AddBankAccountInput } from "typings/forms";

export default function BankAccountsView() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewBankAccountCreation = async (data: AddBankAccountInput) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currDate = new Date();

    await addAccount({
      id: v4(),
      type: "Savings",
      number: data.accountNumber,
      bankName: data.bankName,
      holdersName: data.accountHoldersName,
      createdAt: currDate,
      updatedAt: currDate,
      syncEnabled: data.syncWithCloud,
      linkedCards: data.linkCards
    });
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
