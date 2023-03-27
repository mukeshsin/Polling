import { createRouter, createWebHashHistory } from "vue-router";
import homeView from "../views/home.vue";
import signUpPage from "../views/signup.vue";
import logInPage from "../views/login.vue";
import addPoll from "../components/addPoll.vue";
import pollList from "../components/pollList.vue";
import showPoll from "../components/showPoll.vue";
import updatePoll from "../components/updatePoll.vue"
import updateOption from "../components/updateoption.vue"

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pollList",
    component: homeView,
    children: [
      {
        path: "/addPoll",
        name: "addPoll",
        component: addPoll,
      },
      {
        path: "/pollList",
        name: "pollList",
        component: pollList,
      },
      {
        path:'/showPoll/:id',
        name: "showPoll",
        component: showPoll,
      },

      {
        path: '/updatePoll/:id',
        name:"UpdatePoll",
        component:updatePoll,
      },
      {
        path: '/updateOption/:id',
        name:"UpdateOption",
        component:updateOption,

      }
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
  history: createWebHashHistory(),
  routes,
});

export default router;

