import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Add as AddIcon, CloudSync as CloudSyncIcon } from "@mui/icons-material";

import { v4 } from "uuid";
import { addAccount } from "database/bankAccountService";
import useDbReady from "hooks/query/idb/useDbReady";
import useGetBankAccounts from "hooks/query/idb/useGetBankAccounts";
import ButtonFit from "components/ButtonFit";
import AddBankAccountDialogDialog from "components/AddBankAccountDialog";
import BaseContainer from "components/BaseContainer";

import type { AddBankAccountInput } from "typings/forms";

export default function BankAccountsView() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: bankAccounts,
    isLoading: bankAccountsLoading,
    isError: bankAccountsError
  } = useGetBankAccounts({ enabled: useDbReady() });

  useEffect(() => {
    if (bankAccountsError) {
      console.error(bankAccountsError);
    }

    if (bankAccountsLoading) {
      console.log("Loading bank accounts...");
    }

    if (bankAccounts) {
      console.log("Bank accounts loaded successfully");
      console.log(bankAccounts);
    }
  }, [bankAccounts, bankAccountsLoading, bankAccountsError]);

  const handleNewBankAccountCreation = async (data: AddBankAccountInput) => {
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
