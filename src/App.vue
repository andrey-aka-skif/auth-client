<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
    <RouterLink :to="{ name: 'login' }">Login</RouterLink>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  display: flex;
  gap: 1em;
}
</style>
