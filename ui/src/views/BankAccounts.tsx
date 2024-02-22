import React, { useState, useRef, useContext } from "react";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import TransitionGroup from "react-transition-group/TransitionGroup";
import {
  Add as AddIcon,
  CloudSync as CloudSyncIcon,
  RefreshRounded as RefreshIcon
} from "@mui/icons-material";

import { v4 } from "uuid";
import { AppContext } from "contexts/App";
import { addAccount, deleteAccount, updateAccount } from "database/bankAccountService";
import useDbReady from "hooks/query/idb/useDbReady";
import useGetBankAccounts from "hooks/query/idb/useGetBankAccounts";
import ButtonFit from "components/ButtonFit";
import DisplayLoadingAlerts from "components/DisplayLoadingAlerts";
import DeleteConfirmationDialog from "components/DeleteConfirmationDialog";
import BankAccountListItem from "components/BankAccountListItem";
import CreateBankAccountDialog from "components/CreateBankAccountDialog";
import BaseContainer from "components/BaseContainer";

import type { BankAccount } from "database/types";
import type { AddBankAccountInput } from "typings/forms";

export default function BankAccountsView() {
  const { showToast } = useContext(AppContext);
  const dbReady = useDbReady();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const {
    data: bankAccounts,
    isLoading: bankAccountsLoading,
    isFetching: bankAccountsFetching,
    isError: bankAccountsError,
    refetch: refetchBankAccounts
  } = useGetBankAccounts({ enabled: dbReady });
  const selectedAccountRef = useRef<BankAccount | null>(null);

  const resetSelection = () => {
    selectedAccountRef.current = null;
  };

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
      linkedCards: data.linkCards,
      mmid: data.mmid,
      ifsc: data.ifscCode,
      nomineesName: data.nomineesName
    });

    refetchBankAccounts();

    showToast("Bank account added successfully", "success");
  };

  const handleBankAccountUpdate = async (data: AddBankAccountInput) => {
    const currDate = new Date();

    await updateAccount({
      id: (selectedAccountRef.current as BankAccount).id,
      number: data.accountNumber,
      bankName: data.bankName,
      holdersName: data.accountHoldersName,
      updatedAt: currDate,
      syncEnabled: data.syncWithCloud,
      linkedCards: data.linkCards,
      mmid: data.mmid,
      ifsc: data.ifscCode,
      nomineesName: data.nomineesName
    });

    resetSelection();
    await refetchBankAccounts();

    showToast("Bank account updated", "info");
  };

  const handleBankAccountDeletion = async () => {
    setDeleteConfirmationOpen(false);
    await deleteAccount((selectedAccountRef.current as BankAccount).id);
    refetchBankAccounts();
    resetSelection();

    showToast("Bank account deleted", "error");
  };

  const processBankAccountEdit = (account: BankAccount) => {
    selectedAccountRef.current = account;
    setIsOpen(true);
  };

  const processBankAccountDeletion = (account: BankAccount) => {
    selectedAccountRef.current = account;
    setDeleteConfirmationOpen(true);
  };

  return (
    <BaseContainer pageTitle="Bank Accounts">
      <CreateBankAccountDialog
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          resetSelection();
        }}
        isEditing={!!selectedAccountRef.current}
        title={`${selectedAccountRef.current ? "Edit" : "Create"} Bank Account`}
        account={selectedAccountRef.current as BankAccount}
        handleUpdate={handleBankAccountUpdate}
        handleSave={handleNewBankAccountCreation}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        infoText="This action cannot be undone."
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={handleBankAccountDeletion}
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

      <DisplayLoadingAlerts
        error={bankAccountsError}
        loading={bankAccountsLoading}
        fetching={bankAccountsFetching}
        dataLength={bankAccounts?.length}
        messages={{
          error: "There was a problem loading your accounts.",
          noData: "No accounts to display. Add a new account to view it here."
        }}
      />

      {bankAccounts && bankAccounts.length > 0 && (
        <TransitionGroup>
          {bankAccounts.map(account => (
            <Collapse key={account.id}>
              <BankAccountListItem
                account={account}
                editAccount={processBankAccountEdit}
                shareAccount={() => console.log("Share account")}
                deleteAccount={processBankAccountDeletion}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      )}
    </BaseContainer>
  );
}
