import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("query error:", error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log("mutation error:", error);
    },
  }),
  defaultOptions: {
    queries: {
      // Kapan perlu refresh data
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Seberapa lama data di-cache
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error instanceof AxiosError && error.status && error.status >= 400 && error.status < 500) {
          console.log("query error: ", error);
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});
