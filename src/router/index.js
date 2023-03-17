import { createRouter, createWebHistory } from "vue-router";
import homeView from "../views/home.vue";
import signUpPage from "../views/signup.vue";
import logInPage from "../views/login.vue";
import addpoll from "../components/addPoll.vue";
import pollList from "../components/pollList.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: homeView,
    children: [
      {
        path: "/addPoll",
        name: "/addPoll",
        component: addpoll,
      },
      {
        path: "/pollList",
        name: "/pollList",
        component: pollList,
      },
    ],
  },
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
