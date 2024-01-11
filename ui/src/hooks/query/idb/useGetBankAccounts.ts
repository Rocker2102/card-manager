import { useQuery } from "@tanstack/react-query";
import appDb from "database/app";

import type { CustomQueryOptions } from "./types";

export default function useGetBankAccounts(props?: CustomQueryOptions) {
  return useQuery({
    queryKey: ["bank-accounts"],
    queryFn: () => {
      return appDb.bankAccounts.toArray();
    },
    enabled: props?.enabled
  });
}
