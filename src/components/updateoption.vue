<template>
  <div class="formContainer">
    <div class="pollForm">
      <label class="pollLabels">Update Option</label>
      <input type="text" class="pollInputs" v-model="optionTitle" />
      <span class="addError">{{ updateOptionError }}</span>

      <div>
        <button
          type="submit"
          class="pollBtn"
          @click="updateOption(optionTitle, id)"
        >
          Update Option
        </button>
        <button type="submit" class="cancelBtn" @click="viewPolls">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { pollApi } from "../composable/pollApi";
export default {
  name: "updateOption",
  setup() {
    const { poll, viewPolls, updateOption, showPollOption, updateOptionError } =
      pollApi();
    const route = useRoute();
    const { id } = route.params;
    const { optionTitle } = route.params;

    return {
      poll,
      viewPolls,
      id,
      optionTitle,
      updateOption,
      showPollOption,
      updateOptionError,
    };
  },
};
</script>

<style scoped></style>
