import React, { useState } from "react";
import { Alert, Stack } from "@mui/material";
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

      <Stack spacing={1} direction="row" mb={3} justifyContent="space-between">
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

      {bankAccountsLoading && <Alert severity="info">Loading...</Alert>}

      {!bankAccountsLoading && bankAccountsError && (
        <Alert severity="error">There was a problem loading your accounts.</Alert>
      )}

      {bankAccounts && bankAccounts.length === 0 && (
        <Alert severity="warning">No accounts to display</Alert>
      )}

      {bankAccounts && bankAccounts.length > 0 && (
        <Alert severity="success">Yayy.. found your accounts</Alert>
      )}
    </BaseContainer>
  );
}
