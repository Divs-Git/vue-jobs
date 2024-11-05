<template>
  <AppHero />
  <HomeCards />
  <JobsListing :limit="3" :show-view-all-button="true" />
</template>

<script setup>
import AppHero from '@/components/AppHero.vue'
import HomeCards from '@/components/HomeCards.vue'
import JobsListing from '@/components/JobsListing.vue'
</script>
