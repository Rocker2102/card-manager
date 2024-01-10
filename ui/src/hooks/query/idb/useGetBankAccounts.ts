import { useQuery } from "@tanstack/react-query";
import appDb from "database/app";

export default function useGetBankAccounts() {
  return useQuery({
    queryKey: ["bank-accounts"],
    queryFn: () => {
      return appDb.bankAccounts.toArray();
    }
  });
}
