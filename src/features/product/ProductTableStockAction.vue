<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import type { IProduct } from './product.types'
import { useUpdateProductStock } from './product.queries'
import { normalizeInteger } from '@/shared/helpers'

const props = defineProps<{
  product: IProduct
}>()

const { mutate, isPending } = useUpdateProductStock()

const stockValue = ref<number>(props.product.stock_quantity)

const handleSaveChanges = () => {
  const normalized = normalizeInteger(stockValue.value)

  if (normalized === null) {
    toast.error('Please enter a valid integer.')
    return
  }

  if (normalized < 0) {
    toast.error('Stock quantity cannot be less than 0.')
    return
  }

  if (normalized === props.product.stock_quantity) {
    toast.warning('New stock quantity cannot be the same as the current stock.')
    return
  }

  mutate(
    { productId: props.product.id.toString(), stockQuantity: normalized },
    {
      onSuccess: () => {
        toast.success('Stock updated successfully.')
      },
      onError: (error) => {
        toast.error('An error occurred while updating stock: ' + error.message)
      },
    },
  )
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="w-full"> Update Stock </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Stock Update</DialogTitle>
        <DialogDescription> Make changes and click save when you're done. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4">
        <div class="grid gap-3">
          <Label for="stock">Stock</Label>
          <Input
            id="stock"
            v-model="stockValue"
            type="number"
            min="0"
            name="stock"
            @keyup.enter="handleSaveChanges"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline"> Cancel </Button>
        </DialogClose>
        <Button :disabled="isPending" @click="handleSaveChanges">
          {{ isPending ? 'Saving...' : 'Save changes' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
