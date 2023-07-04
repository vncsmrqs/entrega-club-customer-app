import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../views/MainView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
  routes: [
    {
      path: '/',
      component: MainView,
      children: [
        {
          path: '/',
          redirect: { name: 'home' },
        },
        {
          path: '/inicio',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/busca',
          name: 'search',
          component: () => import('../views/SearchView.vue'),
        },
        {
          path: '/pedidos',
          name: 'orders',
          component: () => import('../views/OrdersView.vue'),
        },
        {
          path: '/perfil',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
        },
        {
          path: '/notificacoes',
          name: 'notifications',
          component: () => import('../views/NotificationView.vue'),
        },
        {
          path: '/estabelecimento/:merchantId',
          name: 'merchant',
          component: () => import('../views/MerchantView.vue'),
        },
      ],
    },
  ],
});

export default router;
