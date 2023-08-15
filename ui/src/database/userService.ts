import userDb from "database/user";

import type { User } from "database/types";

export const getUserById = async (id: string) => {
  return await userDb.users.get(id);
};

export const hasAnyUserRegistered = async () => {
  return (await userDb.users.count()) > 0;
};

export const getUser = async () => {
  const [user] = await userDb.users.toArray();
  return user;
};

export const addUser = async (user: User) => {
  return await userDb.users.add(user);
};

export const updateUser = async (user: User) => {
  return await userDb.users.put(user);
};

export const deleteUser = async (id: string) => {
  return await userDb.users.delete(id);
};
