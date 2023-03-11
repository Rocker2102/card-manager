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
  expiry?: string;
}

export interface BankAccount {
  id: number | string;
  bankName: string;
  accountNumber?: string;
  accountType: "Current" | "Savings";
  name: string;
  ifsc: string;
  lastFourDigits: string;
  balance?: number;
  balanceUpdatedAt?: string;
}
