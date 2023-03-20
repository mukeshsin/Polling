import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    roles: null,
    user: null,
    signupError: null,
    signErr: null,
    loginError: null,
    poll: null,
    polls: [],
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload;
    },
    setUser: (state, data) => {
      state.user = data;
    },
    setPoll: (state, payload) => {
      state.poll = payload;
    },
    setPolls: (state, payload) => {
      state.polls = state.polls.concat(payload);
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

    // add new poll

    async addPoll({ commit }, { title, options }) {
      try {
        const res = await axios.post(
          "https://pollapi.innotechteam.in/poll/add",
          {
            title: title,
            options: options,
          }
        );
        const { poll } = res.json;
        commit("setPoll", poll);
        console.log("create poll successfully");
      } catch (error) {
        console.log(error);
      }
    },
    //get list poll

    async getAllPoll({ commit }, { page, limit }) {
      try {
        const res = await axios.get(`https://pollapi.innotechteam.in/poll/list/${page}?limit=${limit}`);
        const polls = res.data.rows;
        console.log(res.data);
        commit("setPolls", polls);
      } catch (error) {
        console.log(error);
      }
    },
    

    //get single poll
    async getSinglePoll({ commit }, {pollId }) {
      try {
        const res = await axios.get(
          `https://pollapi.innotechteam.in/poll/${pollId}`
        );
       
        console.log(res.data);
        commit("setPoll", res.data);
      } catch (error) {
        console.log(error);
      }
    },

    //update poll

    async updatePoll({ commit }, { id }) {
      try {
        const res = await axios.get(
          `https://pollapi.innotechteam.in/poll/${id}`
          
        );
        
        console.log(res.data);
        commit("setPoll", res.data);
      } catch (error) {
        console.log(error);
      }
    },

    //delete poll

    async deletePoll({ commit }, { PollId }) {
      try {
        const res = await axios.get(
          `https://pollapi.innotechteam.in/poll/${PollId}`
        );
        console.log(res.data);
        commit("setPoll", res.data);
      } catch (error) {
        console.log(error);
      }
    },

    
  },
  modules: {},
});
