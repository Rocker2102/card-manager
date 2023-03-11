import Dexie, { Table } from "dexie";
import { Card, BankAccount } from "./types";
import { DB_NAME, DB_VERSION } from "../shared/enum";

export class AppDatabase extends Dexie {
  cards!: Table<Card>;
  bankAccounts!: Table<BankAccount>;

  constructor() {
    super(DB_NAME);

    this.version(DB_VERSION).stores({
      cards: "++id, network, type, number, name, expiry",
      bankAccounts: "++id, bankName, accountNumber, accountType, name"
    });
  }
}

export const db = new AppDatabase();
