<template>
<div class="formContainer" v-if="polls">
    <h2 class="poll-head">Poll-System</h2>
    <div class="poll" v-for="poll in polls" :key="poll.id">
        <div class="mainDiv">
            <h3>{{ poll.title }}</h3>
            <div class="pollIcons">
                <span @click="deletePoll(poll.id)"><i class="fa fa-trash"></i></span>
                <span @click="updatePoll(poll.id)"><i class="fa fa-edit"></i></span>
                <span @click="showPoll(poll.id)"><i class="fa fa-solid fa-arrow-right"></i></span>
            </div>
        </div>
        <div class="pollOptions" v-for="option in poll.optionList" :key="option.id">
            <input type="checkbox"  class="checkboxFix" value="true " />
            <h2>{{ option.optionTitle }}</h2>
            <span @click="showPollOption(option.id, option.optionTitle)" class="optIcon"><i class="fas fa-edit"></i></span>
            <span class="optIcon" @click="deletePollOption(option.id)" v-if="poll.optionList.length > 3"><i class="fas fa-trash"></i></span>
        </div>
    </div>
</div>
</template>

<script>
import {
    pollApi
} from "../composable/pollApi";

export default {
    name: "pollList",
    setup() {
        return {
            ...pollApi(),
        };
    },
};
</script>

<style scoped></style>
