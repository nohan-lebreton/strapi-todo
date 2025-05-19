// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/TheDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
