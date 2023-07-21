import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (to.query.productId || from.query.productId) {
      return;
    }

    if (to.meta.scrollBehavior) {
      return to.meta.scrollBehavior;
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
  routes: [
    {
      path: '/',
      component: () => import('../views/MainView.vue'),
      children: [
        {
          path: '/',
          component: () => import('../views/MainView/HomeView.vue'),
          children: [
            {
              path: '/',
              name: 'home',
              redirect: { name: 'home-default' },
            },
            {
              path: '/inicio',
              name: 'home-default',
              component: () =>
                import('../views/MainView/HomeView/DefaultView.vue'),
            },
            {
              path: '/restaurantes',
              name: 'restaurants',
              component: () =>
                import('../views/MainView/HomeView/RestaurantsView.vue'),
            },
            {
              path: '/bebidas',
              name: 'liquor-store',
              component: () =>
                import('../views/MainView/HomeView/LiquorStoreView.vue'),
            },
          ],
        },
        {
          path: '/busca',
          name: 'search',
          component: () => import('../views/MainView/SearchView.vue'),
        },
        {
          path: '/pedidos',
          name: 'orders',
          component: () => import('../views/MainView/OrdersView.vue'),
        },
        {
          path: '/perfil',
          name: 'profile',
          component: () => import('../views/MainView/ProfileView.vue'),
        },
        {
          path: '/notificacoes',
          name: 'notifications',
          component: () => import('../views/MainView/NotificationView.vue'),
        },
      ],
    },
    {
      path: '/estabelecimento/:merchantId',
      name: 'merchant',
      meta: {
        scrollBehavior: {
          behavior: 'smooth',
        },
      },
      component: () => import('../views/MerchantView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
