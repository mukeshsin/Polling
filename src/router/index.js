import { createRouter, createWebHashHistory } from "vue-router";
import homeView from "../views/home.vue";
import signUpPage from "../views/signup.vue";
import logInPage from "../views/login.vue";

import pollList from "../components/pollList.vue";
import showPoll from "../components/showPoll.vue";
import updatePoll from "../components/updatePoll.vue";
import updateOption from "../components/updateoption.vue";

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
        component: () => import("../components/addPoll.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("user")).roleId !== 1) {
            next("/pollList");
          } else {
            next();
          }
        },
      },
      {
        path: "/pollList",
        name: "pollList",
        component: pollList,
      },
      {
        path: "/showPoll/:id",
        name: "showPoll",
        component: showPoll,
        props: true,
      },

      {
        path: "/updatePoll/:id",
        name: "UpdatePoll",
        component: updatePoll,
      },
      {
        path: "/updateOption/:id/:optionTitle",
        name: "UpdateOption",
        component: updateOption,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("user")) {
        next("/login");
      } else {
        next();
      }
    },
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
    // // beforeEnter: (to, from, next) => {
    // //   if (localStorage.getItem("user")) {
    // //     next("/home");
    // //   } else {
    // //     next();
    // //   }
    // },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
