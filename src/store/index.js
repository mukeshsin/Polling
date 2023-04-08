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
    page: 1,
    limit: 4,
    titleUpdateError: null,
    updateOptionError: null,
    optionId: [],
  },
  mutations: {
    setRoles: (state, payload) => {
      state.roles = payload;
    },
    setUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    setPoll: (state) => {
      state.poll = JSON.parse(localStorage.getItem("poll"));
    },
    setPolls: (state, payload) => {
      state.polls = payload;
    },

    setOptionId: (state) => {
      state.optionId = JSON.parse(localStorage.getItem("optionId"));
    },

    filterOption: (state) => {
      state.polls.map((poll, payload) => {
        poll.optionList = poll.optionList.filter(
          (option) => option.id !== payload
        );
      });
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
    async signup({ state }, { email, firstName, lastName, roleId, password }) {
      try {
        state.signErr = null;
        state.signupError = null;
        await axios.post("https://pollapi.innotechteam.in/user/register", {
          email: email,
          firstName: firstName,
          lastName: lastName,
          roleId: roleId,
          password: password,
        });
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
        const polls = res.data.rows;
        localStorage.setItem("polls", JSON.stringify(polls));
        commit("setPolls", polls);
        console.log("create poll successfully");
      } catch (error) {
        console.log(error);
      }
    },

    //get list poll
    async getAllPoll({ commit }, { page, limit }) {
      try {
        const res = await axios.get(
          `https://pollapi.innotechteam.in/poll/list/${page}?limit=${limit}`
        );
        const optionId = JSON.parse(localStorage.getItem("optionId"));
        const polls = res.data.rows;
        polls.forEach((poll) => {
          poll.optionList.forEach((option) => {
            if (optionId && optionId.includes(option.id)) {
              poll.disabled = true;
              option.isChecked = true;
            }
          });
        });
        console.log("polls", polls);
        commit("setPolls", [...polls]);
      } catch (error) {
        console.log(error);
      }
    },

    // for get single Poll
    async getSinglePoll({ commit }, { pollId }) {
      try {
        const res = await axios.get(
          `https://pollapi.innotechteam.in/poll/${pollId}`
        );
        const poll = res.data;
        localStorage.setItem("poll", JSON.stringify(poll));
        commit("setPoll", poll);
      } catch (error) {
        console.log(error);
      }
    },

    //delete poll
    async deletePollData({ commit, state }, { pollId }) {
      try {
        const res = await axios.delete(
          `https://pollapi.innotechteam.in/poll/${pollId}`
        );
        console.log(res.data);
        commit(
          "setPolls",
          state.polls.filter((poll) => poll.id !== pollId)
        );
      } catch (error) {
        console.log(error);
      }
    },

    // updatePoll
    async updatePollData({ state }, { title, createdBy, pollId }) {
      try {
        console.log(pollId);
        await axios.put(`https://pollapi.innotechteam.in/poll/${pollId}`, {
          title: title,
          createdBy: createdBy,
        });
        console.log("poll updated successfully");
      } catch (error) {
        console.log(error, state.limit);
      }
    },

    //voteCount
    async voteCount({ state }, { optionId }) {
      if (localStorage.getItem("optionId")) {
        state.optionId = JSON.parse(localStorage.getItem("optionId"));
      } else {
        state.optionId = [optionId];
      }

      try {
        const result = await axios.post(
          `https://pollapi.innotechteam.in/vote/count`,
          {
            optionId: optionId,
          }
        );
        if (!Array.isArray(state.optionId)) {
          state.optionId = [];
        }

        if (!state.optionId.includes(optionId)) {
          state.optionId.push(optionId);
        }

        localStorage.setItem("optionId", JSON.stringify(state.optionId));
        return result;
      } catch (error) {
        console.log(error);
      }
    },

    //updatePollOption
    async updatePollOption({ state }, { optionTitle, optionId }) {
      try {
        console.log(optionId);
        console.log(optionTitle);
        await axios.put(
          `https://pollapi.innotechteam.in/option/edit/${optionId}`,
          {
            optionTitle: optionTitle,
            optionId: optionId,
          }
        );
        console.log("poll option successfully updated");
      } catch (error) {
        console.log(error, state.optionId);
      }
    },

    //deletePollOption
    async deletePollOption({ commit }, { optionId }) {
      try {
        console.log(optionId);
        await axios.delete(
          `https://pollapi.innotechteam.in/option/delete/${optionId}`
        );

        commit("filterOption", optionId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
