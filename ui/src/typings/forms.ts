export type AddBankAccountInput = {
  bankName: string;
  accountNumber: string;
  accountHoldersName: string;
  ifscCode?: string;
  mmid?: string;
  nomineesName?: string;
  syncWithCloud: boolean;
};
