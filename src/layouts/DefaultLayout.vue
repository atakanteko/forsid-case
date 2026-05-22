<script setup lang="ts">
import AppFooter from '@/shared/components/layout/AppFooter.vue'
import AppHeader from '@/shared/components/layout/AppHeader.vue'
import AppMain from '@/shared/components/layout/AppMain.vue'
</script>

<template>
  <div class="flex min-h-svh flex-col bg-background">
    <AppHeader />
    <AppMain />
    <AppFooter />
  </div>
</template>
