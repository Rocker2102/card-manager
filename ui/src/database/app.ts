import Dexie, { Table } from "dexie";
import { applyEncryptionMiddleware, ENCRYPT_LIST } from "dexie-encrypted";

import { DB_NAME, DB_VERSION } from "shared/enum";

import type { Card, BankAccount } from "./types";

export class AppDatabase extends Dexie {
  cards!: Table<Card>;
  bankAccounts!: Table<BankAccount>;

  constructor() {
    super(DB_NAME);

    this.version(DB_VERSION).stores({
      cards: "++id, network, type, number, name, expiry",
      bankAccounts: "++id, bankName, number, type, holdersName, *linkedCards"
    });
  }
}

const db = new AppDatabase();

const encryptionKey = new Uint8Array([1, 2, 3]);

applyEncryptionMiddleware(
  db,
  encryptionKey,
  {
    cards: { type: ENCRYPT_LIST, fields: ["number", "cvv", "expiry"] },
    bankAccounts: {
      type: ENCRYPT_LIST,
      fields: ["number", "ifsc", "balance", "mmid", "nomineesName"]
    }
  },
  async (db: AppDatabase) => {
    return db;
  }
);

export default db;
