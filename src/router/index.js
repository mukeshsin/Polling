import { createRouter, createWebHistory } from "vue-router";
import homeView from "../views/home.vue";
import signUpPage from "../views/signup.vue";
import logInPage from "../views/login.vue";
import addPoll from "../components/addPoll.vue";
import pollList from "../components/pollList.vue";
import showPoll from "../components/showPoll.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pollList",
    component: homeView,
    children: [
      {
        path: "/addPoll",
        name: "addPoll", // corrected name
        component: addPoll,
      },
      {
        path: "/pollList",
        name: "pollList", // corrected name
        component: pollList,
      },
      {
        path: "/showPoll",
        name: "showPoll", // corrected name
        component: showPoll,
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
