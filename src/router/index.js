import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'

const routes = [
  {
    path: '/',
    name: 'search',
    component: SearchView
  },
  {
    path: '/shoppinglist',
    name: 'shoppinglist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ShoppingListView.vue')
  },
  {
    path: '/pantry',
    name: 'pantry',
    component: () => import(/* webpackChunkName: "search" */ '../views/PantryView.vue')
  },
  {
    path: '/cookbook',
    name: 'cookbook',
    component: () => import(/* webpackChunkName: "search" */ '../views/CookBookView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
