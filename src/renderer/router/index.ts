import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'
import Main from '../pages/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
  ]
})

export default router