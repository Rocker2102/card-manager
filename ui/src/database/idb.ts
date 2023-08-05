import Dexie, { Table } from "dexie";
import { DB_NAME, DB_VERSION } from "shared/enum";

import type { Card, BankAccount } from "./types";

export class AppDatabase extends Dexie {
  cards!: Table<Card>;
  bankAccounts!: Table<BankAccount>;

  constructor() {
    super(DB_NAME);

    this.version(DB_VERSION).stores({
      cards: "++id, network, type, number, name, expiry",
      bankAccounts: "++id, bankName, number, type, holdersName"
    });
  }
}

export const db = new AppDatabase();
