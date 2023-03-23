import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export const pollApi = () => {
  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  // add new poll
  const newPoll = reactive({
    title: "",
    options: [],
  });

  let i = 0;

  const pollError = ref("");
  const viewPolls = () => {
    router.push("/polling");
  };

  const updatePollTitle= ()=>{
    router.push("/updatePoll")
  }

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
      if (newPoll.options && newPoll.options.length > 2) {
        pollError.value = "";
        try {
          await store.dispatch("addPoll", {
            title: newPoll.title,
            options: newPoll.options,
          });
        } catch (error) {
          console.log(error);
        }
  
        router.push("/pollList");
        pollError.value = "";
      } else {
        pollError.value = "Options should be greater than 2";
      }
    } else {
      pollError.value = "Title must contain atleast 10 characters";
    }
  };
  

  // delete poll

  const deletePoll = async (pollId) => {
    console.log("delete a poll");
    try {
      await store.dispatch("deletePollData", {
        pollId: pollId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // update poll
 

  const updatePoll = async () => {};

  // showPoll

  //get single poll api
  const getSingle = async () => {
    const {id}=route.params
    console.log("Get show poll...");
    try {
      await store.dispatch("getSinglePoll", { pollId: id });
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
    updatePollTitle,
    getSingle,
    poll: computed(() => {
      return store.state.poll;
    }),

    polls: computed(() => {
      return store.state.polls;
    }),
    user: computed(() => {
      return store.state.user;
    }),
    
  };
};
