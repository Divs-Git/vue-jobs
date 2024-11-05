<template>
  <section class="bg-green-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div v-if="isLoading" class="text-center text-green-500 py-6">
        <ClipLoader />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Job Listing -->
        <JobsListingCard
          v-for="job in jobs.slice(0, limit || jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>

  <section class="m-auto max-w-lg my-10 px-6" v-if="showViewAllButton">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>

<script setup>
import JobsListingCard from './JobsListingCard.vue'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import jobsAPI from '@/api/jobsAPI'

defineProps({
  limit: Number,
  showViewAllButton: {
    type: Boolean,
    default: false,
  },
})

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await jobsAPI.getJobs()
    jobs.value = response
  } catch (error) {
    console.log('Error is caught: ', error)
  } finally {
    isLoading.value = false
  }
})

const jobs = ref([])
const isLoading = ref(false)
</script>
