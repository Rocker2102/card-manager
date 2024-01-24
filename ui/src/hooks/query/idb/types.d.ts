import type { UseQueryOptions } from "@tanstack/react-query";

export type CustomQueryOptions = Omit<UseQueryOptions, "queryKey" | "queryFn">;
