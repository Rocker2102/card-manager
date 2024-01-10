import { useQuery } from "@tanstack/react-query";
import appDb from "database/app";

import type { UseQueryOptions } from "@tanstack/react-query";

export default function useGetBankAccounts(props?: Omit<UseQueryOptions, "queryKey" | "queryFn">) {
  return useQuery({
    queryKey: ["bank-accounts"],
    queryFn: () => {
      return appDb.bankAccounts.toArray();
    },
    enabled: props?.enabled
  });
}
