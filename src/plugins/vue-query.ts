import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import type { App } from 'vue'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
})

export function setupVueQuery(app: App) {
  app.use(VueQueryPlugin, { queryClient })
}
