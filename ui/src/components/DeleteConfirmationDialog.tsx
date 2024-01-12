import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/DeleteOutlineRounded";

type DeleteConfirmationDialogProps = {
  open: boolean;
  title?: string;
  infoText?: string;
  keepMounted?: boolean;
  onClose: () => void;
  onConfirm: () => unknown;
};

export default function DeleteConfirmationDialog({
  open,
  title = "Are you sure you want to delete this item?",
  infoText,
  keepMounted = false,
  onClose,
  onConfirm
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog maxWidth="xs" keepMounted={keepMounted} open={open}>
      <DialogTitle>{title}</DialogTitle>

      {infoText && <DialogContent>{infoText}</DialogContent>}

      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>

        <Button color="error" startIcon={<DeleteIcon />} onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
