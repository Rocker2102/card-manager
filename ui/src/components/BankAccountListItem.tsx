import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ContentRow from "components/ContentRow";

import type { BankAccount } from "database/types";

type BankAccountListItemProps = {
  account: BankAccount;
};

type SecondaryTextProps = {
  account: BankAccount;
  last4digits: string;
};

function SecondaryText({ account, last4digits }: SecondaryTextProps) {
  return (
    <>
      <Typography variant="button">{account.type} Account</Typography>

      <ContentRow variant="body1" value={`XX ${last4digits}`} copyValue={account.number} />

      <ContentRow
        title="Holder's Name"
        value={account.holdersName}
        copyValue={account.holdersName}
      />
    </>
  );
}

export default function BankAccountListItem({ account }: BankAccountListItemProps) {
  const formattedAccountNumber = account.number.replace(/(\d{4})/g, "$1 ");
  const last4Digits = formattedAccountNumber.slice(-4);

  return (
    <ListItem alignItems="flex-start" sx={{ borderRadius: 4 }}>
      <ListItemAvatar>
        <Avatar>{account.bankName[0]}</Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={<Typography variant="h6">{account.bankName}</Typography>}
        secondary={<SecondaryText account={account} last4digits={last4Digits} />}
      />
    </ListItem>
  );
}
