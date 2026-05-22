<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import ProductTableStockAction from './ProductTableStockAction.vue'
import type { IProduct } from './product.types'
import { Ellipsis } from 'lucide-vue-next'

const props = defineProps<{
  product: IProduct
}>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline"> <Ellipsis /> </Button>
    </PopoverTrigger>
    <PopoverContent class="w-40">
      <ProductTableStockAction :product="props.product" />
    </PopoverContent>
  </Popover>
</template>
