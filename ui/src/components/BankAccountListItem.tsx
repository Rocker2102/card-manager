import React, { useState, memo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import {
  EditOutlined as EditIcon,
  ShareOutlined as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  DeleteOutlined as DeleteIcon
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ContentRow from "components/ContentRow";
import getLogoSrc from "helpers/bankIconResolver";

import type { BankAccount } from "database/types";

const ACCOUNT_LOGO_SIZE = "64px";

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
    <CardActions sx={{ justifyContent: "end" }}>
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

type ExpandedInfoProps = {
  account: BankAccount;
};

function ExpandedInfo({ account }: ExpandedInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreInfo =
    account.ifsc || account.mmid || account.nomineesName || (account?.linkedCards || []).length > 0;

  if (!hasMoreInfo) return null;

  return (
    <CardContent sx={{ py: 0 }}>
      <Button
        variant="text"
        color="warning"
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{ width: "100%" }}
        endIcon={
          <ExpandMoreIcon
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          />
        }
      >
        {isExpanded ? "Hide" : "Show more"} info
      </Button>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2 }}>
          {account.ifsc && (
            <ContentRow title="IFSC Code" value={account.ifsc} copyValue={account.ifsc} inline />
          )}

          {account.mmid && (
            <ContentRow title="MMID" value={account.mmid} copyValue={account.mmid} inline />
          )}

          {account.nomineesName && (
            <ContentRow title="Nominee's Name" value={account.nomineesName} />
          )}

          {(account?.linkedCards || []).length > 0 && (
            <ContentRow
              title="Number of cards linked to this bank account"
              value={"" + (account?.linkedCards as unknown as number[]).length}
            />
          )}
        </Box>
      </Collapse>
    </CardContent>
  );
}

type BankAccountListItemProps = {
  account: BankAccount;
  editAccount: (account: BankAccount) => void;
  shareAccount: () => void;
  deleteAccount: (account: BankAccount) => void;
};

function BankAccountListItem({
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
        avatar={
          <Avatar
            alt={account.bankName}
            src={getLogoSrc(account.bankName)}
            variant="rounded"
            sx={{ height: ACCOUNT_LOGO_SIZE, width: ACCOUNT_LOGO_SIZE }}
            imgProps={{ sx: { objectFit: "contain" } }}
          />
        }
        title={
          <Typography variant="h6" align="left">
            {account.bankName}
          </Typography>
        }
        subheader={<SecondaryText account={account} last4digits={last4Digits} />}
        action={
          matches ? (
            <Actions
              remove={() => deleteAccount(account)}
              edit={() => editAccount(account)}
              share={shareAccount}
            />
          ) : null
        }
        disableTypography
      />

      <ExpandedInfo account={account} />

      {!matches && (
        <Actions
          remove={() => deleteAccount(account)}
          edit={() => editAccount(account)}
          share={shareAccount}
        />
      )}
    </Card>
  );
}

export default memo(BankAccountListItem, (prev, next) =>
  Object.keys(prev).every(
    k => prev.account[k as keyof BankAccount] === next.account[k as keyof BankAccount]
  )
);
