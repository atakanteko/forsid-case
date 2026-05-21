<script setup lang="ts">
import { useProducts } from '@/features/product/product.queries'
import { ref, watchEffect } from 'vue'

const count = ref(0)
const { data, isLoading, error, isSuccess } = useProducts()

watchEffect(() => {
  console.log('query data', data.value)
  console.log('isLoading', isLoading.value)
  console.log('error', error.value)
})
</script>

<template>
  <div class="space-y-4">
    <p v-if="isLoading" class="text-sm text-gray-500">Loading products…</p>
    <p v-else-if="error" class="text-sm text-red-600">{{ error.message }}</p>
    <p v-else-if="isSuccess && data" class="text-sm text-gray-700">
      {{ data.meta.total }} products loaded
    </p>

    <button
      type="button"
      class="rounded-md bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-500"
      @click="count++"
    >
      Count is: {{ count }}
    </button>
  </div>
</template>
