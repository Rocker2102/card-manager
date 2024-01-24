import appDb from "database/app";

import type { BankAccount } from "database/types";

export const getAccountById = async (id: string) => {
  return await appDb.bankAccounts.get(id);
};

export const getAccounts = async () => {
  return await appDb.bankAccounts.toArray();
};

export const addAccount = async (bankAccount: BankAccount) => {
  return await appDb.bankAccounts.add(bankAccount);
};

export const updateAccount = async (
  bankAccount: Partial<BankAccount> & Pick<BankAccount, "id">
) => {
  return await appDb.bankAccounts.update(bankAccount.id, bankAccount);
};

export const deleteAccount = async (id: string) => {
  return await appDb.bankAccounts.delete(id);
};
