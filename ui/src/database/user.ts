import Dexie, { Table } from "dexie";

import { USER_DB_NAME, USER_DB_VERSION } from "shared/enum";

import type { User } from "./types";

export class UserDatabase extends Dexie {
  users!: Table<User>;

  constructor() {
    super(USER_DB_NAME);

    this.version(USER_DB_VERSION).stores({
      users: "++id"
    });
  }
}

const db = new UserDatabase();

export default db;
