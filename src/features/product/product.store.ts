import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const page = ref(1)
  const search = ref('')
  const status = ref('')
  const stock = ref('')

  function setPage(value: number) {
    page.value = value
  }

  function setSearch(value: string) {
    search.value = value
  }

  function setStatus(value: string) {
    status.value = value
  }

  function setStock(value: string) {
    stock.value = value
  }

  return {
    page,
    search,
    status,
    stock,
    setPage,
    setSearch,
    setStock,
    setStatus,
  }
})
