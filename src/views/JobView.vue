<template>
  <BackButton />
  <section v-if="!isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ jobs.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ jobs.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ jobs.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
              Job Description
            </h3>

            <p class="mb-4">
              {{ jobs.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ jobs.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>

            <h2 class="text-2xl">{{ jobs.company.name }}</h2>

            <p class="my-2">
              {{ jobs.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ jobs.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ jobs.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${jobID}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              @click="handleDeleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-green-500 py-6">
    <ClipLoader />
  </div>
</template>

<script setup>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import BackButton from '@/components/BackButton.vue'
import { ref, onBeforeMount } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import jobsAPI from '@/api/jobsAPI'
import axios from 'axios'

const route = useRoute()
const jobID = route.params.id
const toast = useToast()
const router = useRouter()

const jobs = ref([])
const isLoading = ref(false)

const handleDeleteJob = async () => {
  const confirm = window.confirm('Are you sure you want to delete this job?')
  if (confirm) {
    try {
      await axios.delete(`/api/jobs/${jobID}`)
      toast.success('Job deleted successfully')
      router.push('/jobs')
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete job')
    }
  } else {
    return
  }
}

onBeforeMount(async () => {
  isLoading.value = true
  try {
    const response = await jobsAPI.getJob(jobID)
    jobs.value = response
  } catch (error) {
    console.log('Error is caught: ', error)
  } finally {
    isLoading.value = false
  }
})
</script>
