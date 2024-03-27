import { createRouter, createWebHistory, type Router } from 'vue-router';
import { middlewarePipeline } from '@/router/middleware-pipeline';
import { useAppStore } from '@/stores/app';
import { startApplicationMiddleware } from '@/router/middlewares/start-application.middleware';
import { isGuestMiddleware } from '@/router/middlewares/is-guest.middleware';
import { isAuthenticatedMiddleware } from '@/router/middlewares/is-authenticated.middleware';

const router: Router = createRouter({
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
      meta: {
        middlewares: [startApplicationMiddleware],
      },
      children: [
        {
          path: '/',
          redirect: { name: 'home' },
        },
        {
          path: 'selecionar-endereco',
          name: 'select-address',
          meta: {
            ignoreAddressValidationMiddleware: true,
          },
          component: () =>
            import('../components/Address/ValidateAddressSelection.vue'),
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('../components/Logout/LogoutScreen.vue'),
          meta: {
            middlewares: [isAuthenticatedMiddleware],
          },
        },
        {
          path: '/',
          name: 'required-address',
          component: () => import('../components/Main/MainView.vue'),
          meta: {
            // middlewares: [validateAddressSelectionMiddleware],
          },
          children: [
            {
              path: '/inicio',
              name: 'home',
              component: () => import('../components/Home/HomeView.vue'),
              redirect: { name: 'home.index' },
              children: [
                {
                  path: '',
                  name: 'home.index',
                  component: () =>
                    import('../components/Home/HomeDefaultScreen.vue'),
                  meta: {
                    showMenu: true,
                    showBagButton: true,
                  },
                },
                {
                  path: 'restaurantes',
                  name: 'home.restaurants',
                  component: () =>
                    import('../components/Home/HomeRestaurantsScreen.vue'),
                  meta: {
                    showMenu: true,
                    showBagButton: true,
                  },
                },
                {
                  path: 'bebidas',
                  name: 'home.liquor-store',
                  component: () =>
                    import('../components/Home/HomeLiquorStoreScreen.vue'),
                  meta: {
                    showMenu: true,
                    showBagButton: true,
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
                showBagButton: true,
              },
            },
            {
              path: '/pedidos',
              name: 'orders',
              component: () => import('../components/Order/OrdersScreen.vue'),
              meta: {
                showMenu: true,
                showBagButton: true,
              },
            },
            {
              path: '/menu',
              name: 'menu',
              component: () => import('../components/Menu/MenuScreen.vue'),
              meta: {
                showMenu: false,
              },
            },
            {
              path: '/estabelecimento/:merchantId',
              name: 'merchant',
              meta: {
                scrollBehavior: {
                  behavior: 'smooth',
                },
                showBagButton: true,
              },
              component: () =>
                import('../components/Merchant/MerchantScreen.vue'),
            },
            {
              path: '/',
              meta: {
                middlewares: [isAuthenticatedMiddleware],
              },
              children: [
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
                  path: '/pagamentos',
                  name: 'payments',
                  component: () =>
                    import('../components/Payment/PaymentScreen.vue'),
                  meta: {},
                },
              ],
            },
          ],
        },
        {
          path: '/',
          name: 'guest',
          meta: {
            middlewares: [isGuestMiddleware],
          },
          children: [
            {
              path: '/entrar',
              name: 'login',
              component: () => import('../components/Login/LoginScreen.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../components/NotFound/NotFoundView.vue'),
    },
  ],
});

router.beforeResolve(middlewarePipeline);

router.beforeEach(() => {
  const appStore = useAppStore();
  appStore.startNavigationLoading();
});

router.afterEach(() => {
  const appStore = useAppStore();
  appStore.endNavigationLoading();
});

export default router;
