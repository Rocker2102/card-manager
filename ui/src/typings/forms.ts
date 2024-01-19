import type { Card } from "database/types";

export type AddBankAccountInput = {
  bankName: string;
  accountNumber: string;
  accountHoldersName: string;
  ifscCode?: string;
  mmid?: string;
  nomineesName?: string;
  syncWithCloud: boolean;
  linkCards: Array<string>;
};

export type AddCardInput = {
  cardType: Card["type"];
  cardNetwork: Card["network"];
  cardNumber: string;
  holdersName: string;
  cvv: string;
  expiry: string;
  syncWithCloud: boolean;
};

export type AddUser = {
  name: string;
  email?: string;
  mobileNumber?: string;
  password: string;
};
