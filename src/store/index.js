import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    roles: null,
    user: null,
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
    async signup({ commit }, { email, firstName, lastName, roleId, password }) {
      try {
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
        localStorage.setItem("user", JSON.stringify(user)); // add this line to set user data to local storage
    
        commit("setUser", user);
      } catch (error) {
        console.log(error);
      }
    },
    

    async login({ commit }, { email, password }) {
      try {
        const res= await axios
          .post("https://pollapi.innotechteam.in/user/login", {
            email:email,
            password:password,
          })
          
            const { user, token } = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("userToken", JSON.stringify(token));
            commit("setUser", user);
        
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
  modules: {},
});
