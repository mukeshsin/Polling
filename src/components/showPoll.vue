<template>
<div class="formContainer">
    <div class="poll" v-if="poll">
        <div class="Icons">
            <span @click="viewPolls" class="arrow-left"><i class="fa-sharp fa-solid fa-arrow-left"></i></span>
        </div>

        <div class="mainDiv">
            <h2>{{ poll.title }}</h2>
        </div>

        <div class="pollOptions" v-for="option in poll.optionList" :key="option.Id">
            <input type="checkbox" value="true"  :disabled="option.disabled" @change="countVote(option.id, isChecked);option.disabled= true" @click="option.voteCount.length += 1" />
            <span>{{ option.optionTitle }} </span>
            <span class="voteCss">Votes: {{ option.voteCount.length }} </span>
        </div>
    </div>
</div>
</template>

<script>
import {
    pollApi
} from "../composable/pollApi";
import {
    onMounted
} from "vue";
import {
    useStore
} from "vuex";
import {
    useRoute
} from "vue-router";

export default {
    name: "showPoll",
    setup() {
        const {
            poll,

            viewPolls
        } = pollApi();
        const store = useStore();
        const route = useRoute();
        const {
            id
        } = route.params;

        onMounted(async () => {
            try {
                await store.dispatch("getSinglePoll", {
                    pollId: id
                });
            } catch (error) {
                console.log(error);
            }
        });

        return {
            poll,

            viewPolls
        };
    },
};
</script>

<style scoped>
.arrow-left {
    margin-right: 50%;
    font-size: 20px;
}
</style>


