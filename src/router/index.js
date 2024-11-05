import AddJobView from '@/views/AddJobView.vue'
import EditJobView from '@/views/EditJobView.vue'
import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import JobView from '@/views/JobView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView,
    },
    {
      name: 'jobs',
      path: '/jobs',
      component: JobsView,
    },
    {
      name: 'job',
      path: '/jobs/:id',
      component: JobView,
    },
    {
      name: 'add-jobs',
      path: '/jobs/add',
      component: AddJobView,
    },
    {
      name: 'edit-job',
      path: '/jobs/edit/:id',
      component: EditJobView,
    },
    {
      name: 'not-found',
      path: '/:catchAll(.*)',
      component: NotFoundView,
    },
  ],
})

export default router
