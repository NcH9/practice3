import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import IconSupport from '@/components/icons/IconSupport.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('../views/Catalogue.vue')
    },
    {
      path: '/bag',
      name: 'bag',
      component: () => import('../views/Bag.vue')
    },
    {
      path: '/product/:id',
      name: 'product-page',
      component: () => import('../components/singleProduct.vue'),
      props: route => ({ id: Number(route.params.id) })
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login.vue'),
    },
    {
      path: '/signModule',
      name: 'signModule',
      component: () => import('../components/signModule.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
    },
  ]
})

export default router
