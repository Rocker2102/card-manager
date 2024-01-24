import { useQuery } from "@tanstack/react-query";

import appDb from "database/app";
import { QUERY_KEYS } from "shared/enum";

import type { CustomQueryOptions } from "./types";

export default function useGetBankAccounts(props?: CustomQueryOptions) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BANK_ACCOUNTS],
    queryFn: () => {
      return appDb.bankAccounts.toArray();
    },
    enabled: props?.enabled
  });
}
