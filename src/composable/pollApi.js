import { reactive, computed } from "vue";
import { useStore } from "vuex";
export const pollApi = () => {
  const store = useStore();
  const pollData = reactive({
    title: "",
    option: [],
  });


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

  return {
    pollData,
    getpollList,
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
