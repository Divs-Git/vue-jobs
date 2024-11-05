<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleAddJobFormSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Job Type</label
            >
            <select
              v-model="form.type"
              id="type"
              name="type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Job Listing Name</label
            >
            <input
              v-model="form.title"
              type="text"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="e.g. Senior Vue.js Developer"
              required
            />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              v-model="form.description"
              id="description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add job duties, expectations, and requirements"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="salary" class="block text-gray-700 font-bold mb-2"
              >Salary</label
            >
            <select
              v-model="form.salary"
              id="salary"
              name="salary"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Under ₹5L per annum">Under ₹5L</option>
              <option value="₹5L - ₹10L per annum">₹5L - ₹10L</option>
              <option value="₹10L - ₹15L per annum">₹10L - ₹15L</option>
              <option value="₹15L - ₹20L per annum">₹15L - ₹20L</option>
              <option value="₹20L - ₹25L per annum">₹20L - ₹25L</option>
              <option value="₹25L - ₹30L per annum">₹25L - ₹30L</option>
              <option value="Over ₹30L per annum">Over ₹30L</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Location </label>
            <input
              v-model="form.location"
              type="text"
              id="location"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="e.g. Bangalore, Karnataka"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2"
              >Company Name</label
            >
            <input
              v-model="form.company.name"
              type="text"
              id="company"
              name="company"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. NewTek Solutions India"
            />
          </div>

          <div class="mb-4">
            <label
              for="company_description"
              class="block text-gray-700 font-bold mb-2"
              >Company Description</label
            >
            <textarea
              v-model="form.company.description"
              id="company_description"
              name="company_description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Briefly describe what your company does"
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
              >Contact Email</label
            >
            <input
              v-model="form.company.contactEmail"
              type="email"
              id="contact_email"
              name="contact_email"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>

          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Contact Phone</label
            >
            <input
              v-model="form.company.contactPhone"
              type="tel"
              id="contact_phone"
              name="contact_phone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone number for applicants"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import router from '@/router'
import axios from 'axios'
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'

const form = reactive({
  title: '',
  type: '',
  description: '',
  location: '',
  salary: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  },
})

const toast = useToast()

const handleAddJobFormSubmit = async () => {
  const newJob = {
    title: form.title,
    type: form.type,
    description: form.description,
    location: form.location,
    salary: form.salary,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  }

  try {
    const res = await axios.post(`/api/jobs`, newJob)
    toast.success('Job Added Successfully')
    router.push(`/jobs/${res.data.id}`)
  } catch (error) {
    toast.error('Failed to add job')
    console.log(error)
  }
}
</script>
