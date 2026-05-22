import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

import type { IProductResponse, IProductStockUpdatePayload } from './product.types'
import { useProductsStore } from './product.store'
import { getProducts, updateProductStock } from './product.api'
import { computed } from 'vue'

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useProducts() {
  const store = useProductsStore()

  const filters = computed(() => ({
    search: store.search,
    page: store.page.toString(),
    stock_status: store.stock,
    status: store.status,
  }))

  return useQuery<IProductResponse>({
    queryKey: ['products', filters],
    queryFn: async () => {
      // await sleep(4000)
      return getProducts(filters.value)
    },
    placeholderData: (previousData) => previousData,
  })
}

export function useUpdateProductStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: IProductStockUpdatePayload) => updateProductStock(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    },
  })
}
