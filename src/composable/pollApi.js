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



  const getAllPoll = async () => {
    try {
      const response=await store.dispatch("getPollList", { token, page:1, limit:3 });
      console.log(response);
    
    } catch (error){
      console.log(error);
    }
  };
  

  return {
    pollData,
    getAllPoll,
    poll,
    polls,
  };
};

