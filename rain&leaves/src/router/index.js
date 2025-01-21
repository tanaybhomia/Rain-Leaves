// Example router setup
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView }, // Ensure this is correctly mapped
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
