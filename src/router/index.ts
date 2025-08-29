import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      // route level code-splitting
      // this generates a separate chunk (Privacy.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PrivacyView.vue'),
    },
    {
      path: '/self-host',
      name: 'self-host',
      // route level code-splitting
      // this generates a separate chunk (SelfHost.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SelfHostView.vue'),
    },
  ],
})

export default router
