<script setup lang="ts">
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
import ProductTablePagination from './ProductTablePagination.vue'
import ProductTableFilterBar from './ProductTableFilterBar.vue'
import ProductTableActions from './ProductTableActions.vue'
import ProductTableLoading from './ProductTableLoading.vue'
import { formatDate } from '@/shared/helpers'
import Badge from '@/shared/components/ui/badge/Badge.vue'

const { data: products, isLoading, isFetching, error } = useProducts()
</script>

<template>
  <div>
    <p v-if="error" class="text-sm text-destructive">
      {{ error.message }}
    </p>

    <Card v-else class="w-full pt-0">
      <ProductTableFilterBar />

      <CardContent class="relative">
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
              <TableCell class="font-medium">{{ item.name }}</TableCell>
              <TableCell>{{ item.sku }}</TableCell>
              <TableCell>{{ item.price }}</TableCell>
              <TableCell>{{ item.stock_quantity }}</TableCell>
              <TableCell>
                <Badge :variant="item.is_active ? 'default' : 'destructive'" class="w-20">
                  {{ item.is_active ? 'Active' : 'Inactive' }}
                </Badge>
              </TableCell>
              <TableCell>{{ formatDate(item.updated_at) }}</TableCell>
              <TableCell>
                <ProductTableActions :product="item" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter class="flex items-center justify-center">
        <ProductTablePagination v-if="products?.meta?.total" :meta="products.meta" />
      </CardFooter>
    </Card>
  </div>
</template>
