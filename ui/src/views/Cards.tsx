import React, { useState, useRef, useContext } from "react";
import Stack from "@mui/material/Stack";
import {
  Add as AddIcon,
  CloudSync as CloudSyncIcon,
  RefreshRounded as RefreshIcon
} from "@mui/icons-material";

import { v4 } from "uuid";
import { AppContext } from "contexts/App";
// import { addCard, deleteCard, updateCard } from "database/cardService";
import useDbReady from "hooks/query/idb/useDbReady";
import useGetCards from "hooks/query/idb/useGetCards";
import CreditCard from "components/CreditCard";
import BaseContainer from "components/BaseContainer";
import DeleteConfirmationDialog from "components/DeleteConfirmationDialog";
import ButtonFit from "components/ButtonFit";
import DisplayLoadingAlerts from "components/DisplayLoadingAlerts";

import type { Card } from "database/types";

export default function CardsView() {
  const { showToast } = useContext(AppContext);
  const dbReady = useDbReady();
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const {
    data: cards,
    isLoading: cardsLoading,
    isFetching: cardsFetching,
    isError: cardsError,
    refetch: refetchCards
  } = useGetCards({ enabled: dbReady });
  const selectedCardRef = useRef<Card | null>(null);

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

      <Stack spacing={1} direction="row" mb={3} justifyContent="space-between">
        <ButtonFit
          buttonProps={{
            variant: "outlined",
            startIcon: <AddIcon />,
            onClick: () => true
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

      <div style={{ display: "flex" }}>
        <CreditCard number="4657813469542645" name="Ankush Yadav" cvv="852" expiry="12/28" />
        <CreditCard number="4657813469542645" name="Ankush Yadav" cvv="852" expiry="12/28" />
        <CreditCard number="340256488625643" name="Ankush Yadav" cvv="9764" expiry="12/25" />
      </div>
    </BaseContainer>
  );
}
