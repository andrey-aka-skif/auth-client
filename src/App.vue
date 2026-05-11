<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HeaderUser from './shared/components/HeaderUser.vue'

const route = useRoute()
const isLoginPage = computed(() => route.name === 'login')
</script>

<template>
  <header class="header">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>

    <HeaderUser v-if="!isLoginPage" />
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
