<template>
  <div class="poll" v-if="poll">
    <div class="pollIcon">
      <span @click="viewPolls"><i class="fa-sharp fa-solid fa-arrow-left"></i></span>
    </div>
    <div class="pollHead">
      <h3>{{ poll.title }}</h3>
    </div>
    <div class="polloptionList" v-for="option in poll.optionList" :key="option.id">
      <input type="checkbox" class="checkboxFix" v-model="option.checked" />
      <h2>{{ option.optionTitle }}</h2>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import { pollApi } from "../composable/pollApi";
import { useRoute } from 'vue-router';

export default {
  name: "showPoll",
  setup() {
    const store = useStore();
    const route= useRoute();
    const { poll, viewPolls } = pollApi();

    onMounted(async () => {
      const {id}=route.params
      console.log("Get show poll...");
      try {
        await store.dispatch("getSinglePoll", { pollId: id });
      } catch (error) {
        console.log(error);
      }
    });

    return {
      poll,
      viewPolls,
    };
  },
};
</script>

<style scoped></style>
