import React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  EditOutlined as EditIcon,
  ShareOutlined as ShareIcon,
  DeleteOutlined as DeleteIcon
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ContentRow from "components/ContentRow";

import type { BankAccount } from "database/types";

type BankAccountListItemProps = {
  account: BankAccount;
  editAccount: () => void;
  shareAccount: () => void;
  deleteAccount: () => void;
};

type SecondaryTextProps = {
  account: BankAccount;
  last4digits: string;
};

function SecondaryText({ account, last4digits }: SecondaryTextProps) {
  return (
    <div style={{ textAlign: "left" }}>
      <Typography variant="button">{account.type} Account</Typography>

      <ContentRow variant="body1" value={`XX ${last4digits}`} copyValue={account.number} />

      <ContentRow
        title="Holder's Name"
        value={account.holdersName}
        copyValue={account.holdersName}
      />
    </div>
  );
}

type ActionsProps = {
  edit: () => unknown;
  share: () => unknown;
  remove: () => unknown;
};

function Actions({ edit, share, remove }: ActionsProps) {
  return (
    <CardActions>
      <IconButton color="primary" aria-label="Edit account" onClick={edit}>
        <EditIcon />
      </IconButton>

      <IconButton color="warning" aria-label="Share account details" onClick={share} disabled>
        <ShareIcon />
      </IconButton>

      <IconButton color="error" aria-label="Remove account" onClick={remove}>
        <DeleteIcon />
      </IconButton>
    </CardActions>
  );
}

export default function BankAccountListItem({
  account,
  editAccount,
  shareAccount,
  deleteAccount
}: BankAccountListItemProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const formattedAccountNumber = account.number.replace(/(\d{4})/g, "$1 ");
  const last4Digits = formattedAccountNumber.slice(-4);

  return (
    <Card sx={{ borderRadius: 2, mb: 3 }}>
      <CardHeader
        avatar={<Avatar>{account.bankName[0]}</Avatar>}
        title={
          <Typography variant="h6" align="left">
            {account.bankName}
          </Typography>
        }
        subheader={<SecondaryText account={account} last4digits={last4Digits} />}
        action={
          matches ? (
            <Actions remove={deleteAccount} edit={editAccount} share={shareAccount} />
          ) : null
        }
        disableTypography
      />

      <CardContent>
        <Accordion>
          <AccordionSummary
            expandIcon={null}
            aria-controls="show-more"
            id={`accordian-${account.id}`}
          >
            <Typography justifyContent="center">Show More</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Show more account details here</Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>

      {!matches && <Actions remove={deleteAccount} edit={editAccount} share={shareAccount} />}
    </Card>
  );
}
