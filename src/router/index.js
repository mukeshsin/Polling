import { createRouter, createWebHistory } from "vue-router";

import signUpPage from "../views/signup.vue";
import logInPage from "../views/login.vue";

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: signUpPage,
  },
  {
    path: "/login",
    name: "login",
    component: logInPage,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
