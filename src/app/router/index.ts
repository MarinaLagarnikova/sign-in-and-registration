import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/domains/auth/pages/login/index'),
    },
    {
      path: '/applications',
      component: () => import('@/domains/applications/pages/list/ui/ApplicationsListPage.vue'),
    },
  ],
})

export default router
