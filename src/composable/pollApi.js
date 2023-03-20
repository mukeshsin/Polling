import { reactive, computed } from "vue";
import { useStore } from "vuex";

export const pollApi = () => {
  const store = useStore();

  const pollData = reactive({
    title: "",
    option: [],
  });

  const newPoll = reactive({
    title: "",
    option: [],
  });


  const i=0;
  const option=('ref')
 

// add new option in new polls
  const addOptions=()=>{
   if(option.value){
    if(!newPoll.option.includes(option.value)){
      newPoll.options[i]=option.value
      i++ 
    }
    option.value=""
   }
  }
  
  const deleteNewOption = (key) => {
    newPoll.options = newPoll.options.filter((item) => {
        return key !== item;
    });
    i--
}

  const getpollList = async () => {
    console.log("Getting poll list...");
    try {
      await store.dispatch("getAllPoll", {
        page: 1,
        limit: 4,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSinglepoll = async () => {
    console.log("Get show poll...");
    try {
      await store.dispatch("getSinglePoll",{
      pollId:98
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pollData,
    getpollList,
    addOptions,
    deleteNewOption,
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
