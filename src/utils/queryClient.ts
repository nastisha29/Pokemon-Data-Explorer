import { QueryCache, QueryClient, MutationCache } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
    },
  }),
  mutationCache: new MutationCache({}),
});
