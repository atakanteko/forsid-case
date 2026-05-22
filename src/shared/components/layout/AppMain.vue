<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex-1">
    <div class="mx-auto w-full max-w-screen-2xl p-4 md:p-6">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.name" />
        </Transition>
      </RouterView>
    </div>
  </main>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
