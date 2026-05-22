<script setup lang="ts">
const props = defineProps<{
  meta: IProductMeta
}>()

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination'
import type { IProductMeta } from './product.types'
import { useProductsStore } from './product.store'

const store = useProductsStore()
</script>

<template>
  <div class="flex flex-col gap-6">
    <Pagination
      :v-slot="store.page"
      :items-per-page="10"
      :total="props.meta.total"
      :default-page="1"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious @click="store.setPage(store.page - 1)" />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === store.page"
            @click="store.setPage(item.value)"
          >
            {{ item.value }}
          </PaginationItem>
        </template>

        <PaginationEllipsis :index="4" />

        <PaginationNext @click="store.setPage(store.page + 1)" />
      </PaginationContent>
    </Pagination>
  </div>
</template>
