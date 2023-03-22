import { reactive, computed, ref } from "vue";
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

  let i = 0;

  const pollError = ref("");
  const viewPolls = () => {
    router.push("./polling");
  };

  const pollOption = reactive([]);
  // Define a reactive option object
  const option = ref("");
  // push to add poll router
  const showAddBtn = () => {
    router.push("/addPoll");
  };

  // add new option in new polls
  const addOptions = () => {
    console.log(newPoll.options);
    console.log(option.value);
    if (option.value) {
      if (!newPoll.options.includes(option.value)) {
        newPoll.options.push(option.value);
      }
      option.value = "";
    }
  };

  //delete option in add poll
  const deleteNewOption = (key) => {
    newPoll.options = newPoll.options.filter((item) => {
      return key !== item;
    });
  };

  // edit option in newpoll
  const editNewOption = (key) => {
    option.value = key;
    newPoll.options = newPoll.options.filter((item) => {
      return key !== item;
    });
  };

  // add a newpoll in pollList
  const addNewPoll = async () => {
    for (i = 0; i < newPoll.options.length; i++) {
      pollOption[i] = {
        optionTitle: newPoll.options[i],
      };
    }
    if (newPoll.title.length > 10) {
      if (newPoll.options.array.length > 2) {
        pollError.value = "";
        try {
          await store.dispatch("addPoll", {
            title: newPoll.title,
            options: newPoll.options,
          });
        } catch (error) {
          console.log(error);
        }

        router.push("/");
      } else{
      pollError.value="title must be contain atleast 10 character more"
    
      }
  

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
    editNewOption,
    addNewPoll,
    deletePoll,
    updatePoll,
    newPoll,
    pollOption,
    option,
    viewPolls,
    pollError,
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
