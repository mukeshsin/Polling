import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    roles: null,
    user: null,
    signupError: null,
    signErr: null,
    loginError: null,
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload;
    },
    setUser: (state, data) => {
      state.user = data;
    },
  },
  actions: {
    //for role
    async getRoles({ commit }) {
      try {
        const res = await axios.get(
          "https://pollapi.innotechteam.in/role/list"
        );
        const data = res.data;
        commit("setRoles", data);
      } catch (error) {
        console.log(error);
      }
    },

    //for signup
    async signup(
      { commit, state },
      { email, firstName, lastName, roleId, password }
    ) {
      try {
        state.signErr = null;
        state.signupError = null;
        const res = await axios.post(
          "https://pollapi.innotechteam.in/user/register",
          {
            email: email,
            firstName: firstName,
            lastName: lastName,
            roleId: roleId,
            password: password,
          }
        );
        const { user } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        commit("setUser", user);
        console.log("user created successfully");
      } catch (error) {
        if (error.response.data.errors) {
          state.signupError = error.response.data.errors;
        } else {
          state.signErr = error.response.data;
          state.signupError = null;
        }
      }
    },
    async login({ commit, state }, { email, password }) {
      try {
        state.loginError = null;
        const res = await axios.post(
          "https://pollapi.innotechteam.in/user/login",
          {
            email: email,
            password: password,
          }
        );
        const { user, token } = res.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userToken", JSON.stringify(token));
        commit("setUser", user);
        console.log("user login successfully");
      } catch (error) {
        console.log(error.response.data.message);
        state.loginError = error.response.data.message;
      }
    },
  },
  modules: {},
});
