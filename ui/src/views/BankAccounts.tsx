import React, { useState } from "react";
import List from "@mui/material/List";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import TransitionGroup from "react-transition-group/TransitionGroup";
import {
  Add as AddIcon,
  CloudSync as CloudSyncIcon,
  RefreshRounded as RefreshIcon
} from "@mui/icons-material";

import { v4 } from "uuid";
import { addAccount } from "database/bankAccountService";
import useDbReady from "hooks/query/idb/useDbReady";
import useGetBankAccounts from "hooks/query/idb/useGetBankAccounts";
import ButtonFit from "components/ButtonFit";
import BankAccountListItem from "components/BankAccountListItem";
import AddBankAccountDialogDialog from "components/AddBankAccountDialog";
import BaseContainer from "components/BaseContainer";

import type { AddBankAccountInput } from "typings/forms";

export default function BankAccountsView() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: bankAccounts,
    isLoading: bankAccountsLoading,
    isFetching: bankAccountsFetching,
    isError: bankAccountsError,
    refetch: refetchBankAccounts
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

    refetchBankAccounts();
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

        <Stack spacing={1} direction="row">
          <ButtonFit
            buttonProps={{
              variant: "outlined",
              startIcon: <RefreshIcon />,
              color: "secondary",
              onClick: () => refetchBankAccounts(),
              disabled: bankAccountsFetching
            }}
          >
            Reload
          </ButtonFit>

          <ButtonFit
            buttonProps={{ variant: "outlined", startIcon: <CloudSyncIcon />, disabled: true }}
          >
            Sync
          </ButtonFit>
        </Stack>
      </Stack>

      {bankAccountsFetching && <Alert severity="info">Loading...</Alert>}

      {!bankAccountsLoading && bankAccountsError && (
        <Alert severity="error">There was a problem loading your accounts.</Alert>
      )}

      {bankAccounts && bankAccounts.length === 0 && (
        <Alert severity="warning">No accounts to display. Add a new account to view it here.</Alert>
      )}

      {bankAccounts && bankAccounts.length > 0 && (
        <List sx={{ width: "100%", mt: 2, bgcolor: "background.paper" }}>
          <TransitionGroup>
            {bankAccounts.map(account => (
              <Collapse key={account.id}>
                <BankAccountListItem account={account} />
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      )}
    </BaseContainer>
  );
}
