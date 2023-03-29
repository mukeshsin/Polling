import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export const pollApi = () => {
  const store = useStore();
  const router = useRouter();

  //For newpoll
  const newPoll = reactive({
    title: "",
    options: [],
  });

  //

  // define i
  let i = 0;

  // define pollError ref
  const pollError = ref("");

  // get users
  const user = computed(() => {
    return store.state.user
  });

  //get poll

  const poll = computed(() => {
    return store.state.poll;
  });

  //getPolls

  const polls = computed(() => {
    return store.state.polls;
  });

  //to view single poll
  const showPoll = (key) => {
    router.push(`/showPoll/${key}`);
  };
  

  //to go back to poll list
  const viewPolls = () => {
    router.push('/pollList');
  };

  // condition for show add poll button
  const showAddBtnCondition = ref(false);

  const pollOption = reactive([]);
  // Define a option as  aref
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

    pollOption.sort((a, b) => {
      return a.id - b.id;
    });
    if (newPoll.title.length > 10) {
      if (newPoll.options && newPoll.options.length > 2) {
        pollError.value = "";
        try {
          await store.dispatch("addPoll", {
            title: newPoll.title,
            options: pollOption,
          });
        } catch (error) {
          console.log(error);
        }

        router.push("/pollList");
        pollError.value = "";
      } else {
        pollError.value = "Options should be more than 2";
      }
    } else {
      pollError.value = "Title must contain more than 10 characters";
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

  //update a poll title
  const titleUpdateError = ref(null);
  const showUpdatePoll = (key) => {
    router.push(`/updatePoll/${key}`);
  };

  const updateTitle = async (title, pollId) => {
    if (title.length > 10) {
      console.log(pollId);
      try {
        await store.dispatch("updatePollData", {
          title: title,
          createdBy: user.value.id,
          pollId: pollId,
        });
      } catch (error) {
        console.log(error);
      }
      router.push("/pollList");
      titleUpdateError.value = "";
    } else {
      titleUpdateError.value =
        "Please add a title with more than 10 characters";
    }
  };

  //voteCount
  
  const countVotes= async(optionId)=>{
    try{
      console.log(optionId)
      await store.dispatch("voteCount",{
        optionId
      })

    }catch(error){
      console.log(error)
    }
  }

  return {
    showAddBtn,
    addOptions,
    deleteNewOption,
    editNewOption,
    addNewPoll,
    deletePoll,
    newPoll,
    pollOption,
    option,
    viewPolls,
    pollError,
    showAddBtnCondition,
    showPoll,
    titleUpdateError,
    showUpdatePoll,
    updateTitle,
    user,
    poll,
    polls,
    countVotes
  };
};
