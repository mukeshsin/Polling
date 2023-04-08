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
          type="radio"
          class="radioFix"
          name="option-group"
          :value="true"
          v-model="option.isChecked"
          :disabled="poll.disabled"
          @change="countVotes(option.id)"
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
import { onMounted, computed, ref } from "vue";
import { pollApi } from "../composable/pollApi";

export default {
  name: "pollList",

  setup() {
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
      getPollData,
      isLoading,
    } = pollApi();

    const isChecked = ref("false");
    const radio = ref("false");

    const pollListError = computed(() => {
      if (polls.value.length === 0) {
        return "Please Add a New Poll";
      } else {
        return "";
      }
    });

    onMounted(async () => {
      console.log("Getting poll list...");

      getPollData();
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
      isChecked,
      radio,
    };
  },
};
</script>

<style scoped></style>
