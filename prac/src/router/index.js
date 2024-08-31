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
      path: '/custom-form',
      name: 'custom-form',
      component: () => import('../components/register.vue'),
    }
  ]
})

export default router
