<template>
  <div class="formContainer">
    <div v-if="isLoading">
      <i class="fa fa-spinner fa-spin iconClass"></i> Loading...
    </div>

    <div class="poll" v-for="poll in polls" :key="poll.id">
      <div class="mainDiv">
        <h3>{{ poll.title }}</h3>
        <div class="Icons">
          <span @click="deletePoll(poll.id)"><i class="fa fa-trash"></i></span>
          <span @click="showUpdatePoll(poll.id)"
            ><i class="fa fa-edit"></i
          ></span>
          <span @click="showPoll(poll.id)"
            ><i class="fa-solid fa-arrow-right"></i
          ></span>
        </div>
      </div>
      <div
        class="pollOptions"
        v-for="option in poll.optionList"
        :key="option.id"
      >
        <input
          type="checkbox"
          class="checkboxFix"
          value="true"
          :disabled="option.disabled || isChecked"
          
          @change="
            countVotes(option.id, isChecked);
            option.disabled = true;
            isChecked=true
           
          "
          @click="option.voteCount.length += 1"
        />

        <span>{{ option.optionTitle }}</span>
        <span class="voteCss">Votes: {{ option.voteCount.length }} </span>
        <span
          @click="showPollOption(option.id, option.optionTitle)"
          class="optionIcon"
          ><i class="fas fa-edit"></i
        ></span>
        <span
          class="optionIcon"
          @click="deletePollOption(option.id)"
          v-if="poll.optionList.length > 2"
          ><i class="fas fa-trash"></i
        ></span>
      </div>
    </div>
    <div class="addBtn" v-if="showAddBtnCondition">
      <button class="addPoll" @click="showAddBtn">Add Poll</button>
    </div>
  </div>
  <span class="emptyError">{{ pollListError }}</span>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, computed, ref } from "vue";
import { pollApi } from "../composable/pollApi";

export default {
  name: "pollList",

  setup() {
    const store = useStore();
    const {
      polls,
      deletePoll,
      updatePoll,
      deletePollOption,
      showPollOption,
      showAddBtn,
      updateTitle,
      showPoll,
      showUpdatePoll,
      showAddBtnCondition,
      countVotes,
    } = pollApi();

    const isLoading = ref(true);
    const isChecked = ref(false);
    const checkbox = ref(null);

    const pollListError = computed(() => {
      if (polls.value.length === 0) {
        return "Please Add a New Poll";
      } else {
        return "";
      }
    });

    onMounted(async () => {
      console.log("Getting poll list...");

      try {
        await store.dispatch("getAllPoll", {
          page: store.state.page,
          limit: store.state.limit,
        });
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    });

    onMounted(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.roleId === 1) {
        showAddBtnCondition.value = true;
      }
    });

    return {
      polls,
      deletePoll,
      updatePoll,
      deletePollOption,
      showPollOption,
      showAddBtn,
      updateTitle,
      showPoll,
      showUpdatePoll,
      showAddBtnCondition,
      countVotes,
      pollListError,
      isLoading,
      checkbox,
      isChecked,
    };
  },
};
</script>

<style scoped></style>
