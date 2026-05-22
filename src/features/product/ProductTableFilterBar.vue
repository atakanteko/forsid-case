<script setup lang="ts">
import { CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { useProductsStore } from './product.store'
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import ProductTableCombobox from './ProductTableCombobox.vue'

const store = useProductsStore()
const searchInput = ref(store.search)

const updateSearch = useDebounceFn((value: string) => {
  store.setSearch(value)
}, 400)

watch(searchInput, (value) => {
  updateSearch(value)
})
</script>
<template>
  <CardHeader class="border-b-2 py-2">
    <CardTitle class="text-lg font-semibold text-gray-800 dark:text-white/90">
      Products List
    </CardTitle>
    <div class="flex flex-col gap-2 md:flex-row">
      <Input v-model="searchInput" placeholder="Search..." />
      <div class="flex w-full flex-col gap-1 md:flex-row">
        <ProductTableCombobox
          v-model="store.stock"
          :options="[
            { label: 'In Stock', value: 'in_stock' },
            { label: 'Out of Stock', value: 'out_of_stock' },
          ]"
          placeholder="Filter by Stock"
        />

        <ProductTableCombobox
          v-model="store.status"
          :options="[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]"
          placeholder="Filter by Status"
        />
      </div>
    </div>
  </CardHeader>
</template>
