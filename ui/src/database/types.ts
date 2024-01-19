type MonthYear = {
  month: number;
  year: number;
};

type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type Syncable = {
  syncedAt?: Date;
  syncEnabled: boolean;
};

export interface Card extends Timestamps, Syncable {
  id: string;
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
  number: string;
  holdersName: string;
  cvv: string;
  expiry: MonthYear;
}

export interface BankAccount extends Timestamps, Syncable {
  id: string;
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
}

export interface User extends Timestamps {
  id: string;
  name: string;
  email?: string;
  photoURL?: string;
  mobileNumber?: string;
  password: string;
  permanentUserSecret: ArrayBuffer; // encrypted by password
}
