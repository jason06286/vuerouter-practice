import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [{
      path: 'products',
      component: () => import('../views/Products.vue'),
    },
    {
      path: 'orders',
      component: () => import('../views/Orders.vue'),
    },
    {
      path: 'coupon',
      component: () => import('../views/Coupon.vue'),
    },
    ],
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    children: [{
      path: 'product/:id',
      component: () => import('../views/UserProduct.vue'),
    },
    {
      path: 'cart',
      component: () => import('../views/UserCart.vue'),
    },
    {
      path: 'checkout/:id',
      component: () => import('../views/Checkout.vue'),
    },
    {
      path: 'paysuccess',
      component: () => import('../views/PaySuccess.vue'),
    },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
