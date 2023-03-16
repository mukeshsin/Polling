import { reactive ,computed} from "vue";
import { useStore } from "vuex";
export const pollApi = () => {
  const store = useStore();
  const pollData = reactive({
    title: "",
    option: []
  });
  
  //get poll list
  const polls = computed(() => {
    return store.state.polls;
  });

  //get poll
  const poll = computed(() => {
    return store.state.poll;
  });



  const getpollList = async () => {
    console.log("Getting poll list...");
    try {
      const res = await store.dispatch("getAllPoll", {
        page: 1,
        limit: 4,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  

  return {
    pollData,
    getpollList,
    poll,
    polls,
  };
};

