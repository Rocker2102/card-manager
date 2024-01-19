import React, { useState, useRef, useContext } from "react";
import Stack from "@mui/material/Stack";
import {
  Add as AddIcon,
  CloudSync as CloudSyncIcon,
  RefreshRounded as RefreshIcon
} from "@mui/icons-material";
import styled from "@emotion/styled";

import { v4 } from "uuid";
import { AppContext } from "contexts/App";
import { addCard, deleteCard, updateCard } from "database/cardService";
import useDbReady from "hooks/query/idb/useDbReady";
import useGetCards from "hooks/query/idb/useGetCards";
import CreateCardDialog from "components/CreateCardDialog";
import CreditCard from "components/CreditCard";
import BaseContainer from "components/BaseContainer";
import DeleteConfirmationDialog from "components/DeleteConfirmationDialog";
import ButtonFit from "components/ButtonFit";
import DisplayLoadingAlerts from "components/DisplayLoadingAlerts";

import type { Card } from "database/types";
import type { AddCardInput } from "typings/forms";

export default function CardsView() {
  const { showToast } = useContext(AppContext);
  const dbReady = useDbReady();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const {
    data: cards,
    isLoading: cardsLoading,
    isFetching: cardsFetching,
    isError: cardsError,
    refetch: refetchCards
  } = useGetCards({ enabled: dbReady });
  const selectedCardRef = useRef<Card | null>(null);

  const resetSelection = () => {
    selectedCardRef.current = null;
  };

  const handleNewCardCreation = async (data: AddCardInput) => {
    const currDate = new Date();

    await addCard({
      id: v4(),
      cvv: data.cvv,
      expiry: { month: data.expiryMonth, year: data.expiryYear },
      type: data.cardType,
      network: data.cardNetwork,
      number: data.cardNumber,
      holdersName: data.holdersName,
      createdAt: currDate,
      updatedAt: currDate,
      syncEnabled: data.syncWithCloud
    });

    refetchCards();

    showToast("Card added successfully", "success");
  };

  const handleCardUpdate = async (data: AddCardInput) => {
    const currDate = new Date();

    await updateCard({
      id: (selectedCardRef.current as Card).id,
      cvv: data.cvv,
      expiry: { month: data.expiryMonth, year: data.expiryYear },
      type: data.cardType,
      network: data.cardNetwork,
      number: data.cardNumber,
      holdersName: data.holdersName,
      updatedAt: currDate,
      syncEnabled: data.syncWithCloud
    });

    resetSelection();
    await refetchCards();

    showToast("Card updated", "info");
  };

  const handleCardDeletion = async () => {
    setDeleteConfirmationOpen(false);
    await deleteCard((selectedCardRef.current as Card).id);
    refetchCards();
    resetSelection();

    showToast("Card deleted", "error");
  };

  const processCardEdit = (account: Card) => {
    selectedCardRef.current = account;
    setIsOpen(true);
  };

  const processCardDeletion = (account: Card) => {
    selectedCardRef.current = account;
    setDeleteConfirmationOpen(true);
  };

  return (
    <BaseContainer pageTitle="Saved cards">
      <DeleteConfirmationDialog
        open={deleteConfirmationOpen}
        infoText="This action cannot be undone."
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={() => {
          console.log("Delete confirmation dialog");
        }}
      />

      <CreateCardDialog
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          resetSelection();
        }}
        isEditing={!!selectedCardRef.current}
        title={`${selectedCardRef.current ? "Edit" : "Add"} Card`}
        card={selectedCardRef.current as Card}
        handleUpdate={handleCardUpdate}
        handleSave={handleNewCardCreation}
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
              onClick: () => refetchCards(),
              disabled: cardsFetching
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
        error={cardsError}
        loading={cardsLoading}
        fetching={cardsFetching}
        dataLength={cards?.length}
        messages={{
          error: "There was a problem loading your saved cards.",
          noData: "No cards to display. Add a new card to view it here."
        }}
      />

      <CardContainer>
        <CreditCard number="4657813469542645" name="Ankush Yadav" cvv="852" expiry="12/28" />
        <CreditCard number="4657813469542645" name="Ankush Yadav" cvv="852" expiry="12/28" />
        <CreditCard
          number="3402564886256421"
          type="credit"
          name="Ankush Yadav"
          cvv="9764"
          expiry="12/25"
        />
      </CardContainer>
    </BaseContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  row-gap: 2rem;
  column-gap: 2rem;
`;
