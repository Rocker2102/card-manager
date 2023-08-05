type MonthYear = {
  month: number;
  year: number;
};

export interface Card {
  id: number | string;
  network:
    | "American Express"
    | "Diners Club"
    | "Discover"
    | "Mastercard"
    | "Visa"
    | "Maestro"
    | null;
  type: "debit" | "credit" | "prepaid";
  category?: string; // different according to banks
  number?: string;
  lastFourDigits: string;
  addedAt: string;
  name: string;
  cvv?: string;
  expiry?: MonthYear;

  createdAt: Date;
  updatedAt: Date;
}

export interface BankAccount {
  id: number | string;
  bankName: string;
  number: string;
  type: "Current" | "Savings";
  holdersName: string;
  ifsc?: string;
  balance?: number;
  balanceUpdatedAt?: Date;
  mmid?: string;
  nomineesName?: string;
  linkedCards?: Array<string>;

  createdAt: Date;
  updatedAt: Date;
}
