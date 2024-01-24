import bcrypt from "bcryptjs";

export const hash = async (string: string, rounds = 10) => {
  return await bcrypt.hash(string, rounds);
};

export const compare = async (string: string, hash: string) => {
  return await bcrypt.compare(string, hash);
};
