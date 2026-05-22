<script setup lang="ts">
import { APP_CONFIG } from '@/constants'
</script>

<template>
  <footer class="border-t border-border px-4 py-3 md:px-6">
    <p class="text-xs text-muted-foreground">{{ APP_CONFIG.NAME }} · v{{ APP_CONFIG.VERSION }}</p>
  </footer>
</template>
