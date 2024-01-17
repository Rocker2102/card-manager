import { useQuery } from "@tanstack/react-query";

import appDb from "database/app";
import { QUERY_KEYS } from "shared/enum";

import type { CustomQueryOptions } from "./types";

export default function useGetCards(props?: CustomQueryOptions) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CARDS],
    queryFn: () => {
      return appDb.cards.toArray();
    },
    enabled: props?.enabled
  });
}
