<template>
<div class="formContainer">
    <div class="pollForm" v-if="poll">
        <label class="pollLabels" :for="poll">Update Poll Title</label>
        <input type="text" class="pollInputs" v-model="poll.title" />
        <span class="addError">{{ titleUpdateError }} </span>

        <div>
            <button type="submit" class="pollBtn" @click="updateTitle(poll.title, id)">
                Update Poll
            </button>
            <button type="submit" class="cancelBtn" @click="viewPolls">
                Cancel
            </button>
        </div>
    </div>
</div>
</template>

<script>
import {
    onMounted
} from "@vue/runtime-core";
import {
    useRoute
} from "vue-router";
import {
    pollApi
} from "../composable/pollApi";
import {
    useStore
} from "vuex";
export default {
    name: "updatePoll",
    setup() {
        const {
            poll,
            polls,
            viewPolls,
            updateTitle,
            titleUpdateError,
        } = pollApi();
        const store = useStore();
        const route = useRoute();
        const {
            id
        } = route.params;
        onMounted(async () => {
            console.log(poll);
            try {
                await store.dispatch("getSinglePoll", {
                    pollId: id,
                });
            } catch (error) {
                console.log(error);
            }
        });
        return {
            poll,
            polls,
            id,
            viewPolls,
            updateTitle,
            titleUpdateError,
        };
    },
};
</script>

<style scoped>
.pollLabels {
    font-size: 25px;
    font-weight: bold;
    margin-top: 20px;
}

.pollInputs {
    margin-top: 20px;
    display: flex;
    margin-left: 43%;
    font-size: 18px;
}
</style>
