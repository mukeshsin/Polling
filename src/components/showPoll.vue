<template>
  <div class="formContainer">
    <div v-if="isLoading">
      <i class="fa fa-spinner fa-spin iconClass"></i> Loading...
    </div>
    <div class="poll" v-if="poll">
      <div class="Icon">
        <span @click="viewPolls" class="arrow-left"
          ><i class="fa-sharp fa-solid fa-arrow-left"></i
        ></span>
      </div>

      <div class="mainDiv">
        <h2>{{ poll.title }}</h2>
      </div>

      <div
        class="pollOptions"
        v-for="option in poll.optionList"
        :key="option.Id"
      >
         <input
          type="radio"
          class="radioFix"
           name="option-group"
          value="true"
          :disabled="option.disabled || isChecked"
          @change="
            countVotes(option.id, isChecked);
            option.disabled = true;
            ischecked = true
          "
          @click="option.voteCount.length += 1"
        />
        <span>{{ option.optionTitle }} </span>
        <span class="voteCss">Votes: {{ option.voteCount.length }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { pollApi } from "../composable/pollApi";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "showPoll",
  setup() {
    const {
      poll,
      countVotes,
     isChecked,
      viewPolls,
    } = pollApi();
    const isLoading = ref(true);
    const store = useStore();
    const route = useRoute();
    const { id } = route.params;

    onMounted(async () => {
      try {
        await store.dispatch("getSinglePoll", {
          pollId: id,
        });
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    });

    return {
      poll,
      isLoading,
      viewPolls,
      countVotes,
      isChecked
    };
  },
};
</script>

<style scoped></style>
