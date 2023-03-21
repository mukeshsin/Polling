import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export const pollApi = () => {
  const store = useStore();
  const router = useRouter();

  // add new poll
  const newPoll = reactive({
    title: "",
    options: [],
  });

  // define i
  let i = 0;

   // define option
   const option = reactive({
    value: "",
  });


  // push to add poll router
  const showAddBtn = () => {
    router.push("/addPoll");
  };

  // add new option in new polls
  const addOptions = () => {
    if (option.value) {
      if (!newPoll.options.includes(option.value)) {
        newPoll.options[i] = option.value;
        i++;
      }
      option.value = "";
    }
  };

  //delete option in add poll
  const deleteNewOption = (key) => {
    newPoll.options = newPoll.options.filter((item) => {
      return key !== item;
    });
    i--;
  };

  //update option in add poll
  const updateNewOption = (key) => {
    newPoll.options.push(option.value);
    option.value = "";
    newPoll.options = newPoll.options.filter((item) => {
      return key !== item;
    });
    i--;
  };
  // add a newpoll in pollList
  const addNewPOLL = async () => {
    try {
      await store.dispatch("addPoll", {
        title: newPoll.title,
        options: newPoll.options,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete poll

  const deletePoll = async () => {
    console.log("delete a poll");
    try {
      await store.dispatch("deletePoll", {
        pollId: 321,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // update poll

  const updatePoll = async () => {};

  // showPoll

  //get single poll api
  const getSinglepoll = async (pollId) => {
    console.log("Get show poll...");
    try {
      await store.dispatch("getSinglePoll", {
        pollId: pollId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    showAddBtn,
    addOptions,
    deleteNewOption,
    updateNewOption,
    addNewPOLL,
    deletePoll,
    updatePoll,
    poll: computed(() => {
      return store.state.poll;
    }),

    polls: computed(() => {
      return store.state.polls;
    }),
    user: computed(() => {
      return store.state.user;
    }),
    getSinglepoll,
  };
};
