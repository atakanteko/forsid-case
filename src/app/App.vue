<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import 'vue-sonner/style.css'
import { Toaster } from '@/shared/components/ui/sonner'

const isDev = import.meta.env.DEV
</script>

<template>
  <RouterView />
  <Toaster />
  <VueQueryDevtools v-if="isDev" />
</template>
