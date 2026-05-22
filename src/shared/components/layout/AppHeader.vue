<script setup lang="ts">
import { APP_CONFIG } from '@/constants'
import logo from '@/assets/images/logo.webp'
</script>

<template>
  <header
    class="sticky top-0 z-50 flex w-full items-center border-b border-border bg-background px-4 py-3 md:px-6"
  >
    <img :src="logo" :alt="`${APP_CONFIG.NAME} logo`" class="h-8 w-auto object-contain" />
  </header>
</template>
