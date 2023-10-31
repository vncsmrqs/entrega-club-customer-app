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
              meta: {
                showMenu: true,
              },
            },
            {
              path: '/restaurantes',
              name: 'restaurants',
              component: () =>
                import('../views/MainView/HomeView/RestaurantsView.vue'),
              meta: {
                showMenu: true,
              },
            },
            {
              path: '/bebidas',
              name: 'liquor-store',
              component: () =>
                import('../views/MainView/HomeView/LiquorStoreView.vue'),
              meta: {
                showMenu: true,
              },
            },
          ],
        },
        {
          path: '/busca',
          name: 'search',
          component: () => import('../components/Search/SearchScreen.vue'),
          meta: {
            showMenu: true,
          },
        },
        {
          path: '/pedidos',
          name: 'orders',
          component: () => import('../components/Order/OrdersScreen.vue'),
          meta: {
            showMenu: true,
          },
        },
        {
          path: '/menu',
          name: 'menu',
          component: () => import('../components/Menu/MenuScreen.vue'),
          meta: {
            showMenu: true,
          },
        },
        {
          path: '/notificacoes',
          name: 'notifications',
          component: () =>
            import('../components/Notification/NotificationScreen.vue'),
          meta: {
            showMenu: true,
          },
        },
        {
          path: '/estabelecimento/:merchantId',
          name: 'merchant',
          meta: {
            scrollBehavior: {
              behavior: 'smooth',
            },
          },
          component: () => import('../views/MainView/MerchantView.vue'),
        },
        {
          path: '/pagamentos',
          name: 'payments',
          component: () => import('../components/Payment/PaymentScreen.vue'),
          meta: {
            showMenu: true,
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login/LoginScreen.vue'),
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
