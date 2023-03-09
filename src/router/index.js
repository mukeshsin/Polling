import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import signupCard from '../views/signup.vue'
import logPage from  '../views/loginView.vue'


const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

  {
    path: '/signupCard',
    name: 'signupCard',
    component: signupCard
  },

  {
    path: '/loginCard',
    name: 'loginCard',
    component: logPage
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
