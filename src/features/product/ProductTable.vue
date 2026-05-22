<script setup lang="ts">
import { computed } from 'vue'
import { RefreshCw } from 'lucide-vue-next'

import { useProducts } from '@/features/product/product.queries'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'

import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'

import Badge from '@/shared/components/ui/badge/Badge.vue'

import ProductTablePagination from './ProductTablePagination.vue'
import ProductTableFilterBar from './ProductTableFilterBar.vue'
import ProductTableActions from './ProductTableActions.vue'
import ProductTableLoading from './ProductTableLoading.vue'

import { formatDate } from '@/shared/helpers'
import Button from '@/shared/components/ui/button/Button.vue'

const query = useProducts()

const { data: products, isLoading, isFetching, isError, error, refetch } = query

const errorMessage = computed(() => {
  if (!error.value) {
    return 'Something went wrong.'
  }

  return error.value.message
})
</script>

<template>
  <div>
    <Card class="w-full pt-0">
      <ProductTableFilterBar />

      <CardContent class="relative">
        <div v-if="isError" class="flex min-h-[520px] flex-col items-center justify-center gap-4">
          <div class="space-y-2 text-center">
            <h3 class="text-lg font-semibold">Failed to load products</h3>

            <p class="max-w-sm text-sm text-muted-foreground">
              {{ errorMessage }}
            </p>
          </div>

          <Button
            class="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition hover:bg-accent"
            @click="refetch"
          >
            <RefreshCw class="size-4" />
            Retry
          </Button>
        </div>

        <template v-else>
          <ProductTableLoading v-if="isFetching && !isLoading" />

          <Table :class="{ 'opacity-50': isFetching && !isLoading }">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody class="min-h-[520px]">
              <ProductTableLoading v-if="isLoading" />

              <TableRow
                v-for="item in products?.data"
                :key="item.id"
                :class="item.stock_quantity === 0 ? 'animate-pulse bg-red-200 text-red-700' : ''"
              >
                <TableCell class="font-medium">
                  {{ item.name }}
                </TableCell>

                <TableCell>
                  {{ item.sku }}
                </TableCell>

                <TableCell>
                  {{ item.price }}
                </TableCell>

                <TableCell>
                  {{ item.stock_quantity }}
                </TableCell>

                <TableCell>
                  <Badge :variant="item.is_active ? 'default' : 'destructive'" class="w-20">
                    {{ item.is_active ? 'Active' : 'Inactive' }}
                  </Badge>
                </TableCell>

                <TableCell>
                  {{ formatDate(item.updated_at) }}
                </TableCell>

                <TableCell>
                  <ProductTableActions :product="item" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </template>
      </CardContent>

      <CardFooter class="flex items-center justify-center">
        <ProductTablePagination v-if="products?.meta?.total" :meta="products.meta" />
      </CardFooter>
    </Card>
  </div>
</template>
