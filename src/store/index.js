import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: JSON.stringify(localStorage.getItem("user")) || null,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  actions: {
    async signup({ commit }, { email, firstName, lastName, roleId, password }) {
      try {
        await axios.post("https://pollapi.innotechteam.in/user/register", {
          email,
          firstName,
          lastName,
          roleId,
          password,
        });
        const user = { email, firstName, lastName, roleId, password };
        commit("setUser", user);
      } catch (error) {
        console.error(error);
      }
    },

    async login({ commit }, { email, password }) {
      try {
        await axios.post("https://pollapi.innotechteam.in/user/login", {
          email,
          password,
        });
        const user = { email, password };
        commit("setUser", user);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
