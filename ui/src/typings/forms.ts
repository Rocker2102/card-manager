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

export type AddUser = {
  name: string;
  email?: string;
  mobileNumber?: string;
  password: string;
};
