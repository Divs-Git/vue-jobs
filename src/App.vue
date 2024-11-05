<template>
  <AppNavBar />
  <RouterView />
</template>

<script setup>
import AppNavBar from './components/AppNavbar.vue'
import { RouterView } from 'vue-router'
</script>
