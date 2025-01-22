import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHydrateAtoms } from "jotai/react/utils";
import { queryClientAtom } from "jotai-tanstack-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { compress, decompress } from 'lz-string';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 5 * 1000,
      refetchInterval: 10 * 1000,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  key: "jotai-playground",
  storage: window.localStorage,
  serialize: data => compress(JSON.stringify(data)),
  deserialize: data => JSON.parse(decompress(data)),
});

persistQueryClient({
  queryClient,
  buster: 'jotai-playground-v1',
  persister: localStoragePersister,
})

export const HydrateAtoms: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
