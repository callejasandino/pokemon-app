import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'pokemon',
         // route level code-splitting
         // this generates a separate chunk (About.[hash].js) for this route
         // which is lazy-loaded when the route is visited.
         component: () => import('../views/Pokemon/Pokemon.vue')
      },
      {
         path: '/item',
         name: 'item',
         // route level code-splitting
         // this generates a separate chunk (About.[hash].js) for this route
         // which is lazy-loaded when the route is visited.
         component: () => import('../views/Berry/Item.vue')
      }
   ]
})

export default router
