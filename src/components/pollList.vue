<template>
<div class="formContainer">
    <div class="poll" v-for="poll in polls" :key="poll.id">
        <div class="mainDiv">
            <h3>{{ poll.title }}</h3>
            <div class="pollIcons">
                <span @click="deletePoll(poll.id)"><i class="fa fa-trash"></i></span>
                <span @click="updatePoll(poll.id)"><i class="fa fa-edit"></i></span>
            </div>
        </div>
        <div class="pollOptions" v-for="option in poll.optionList" :key="option.id">
            <input type="checkbox" class="checkboxFix" value="true " />
            <h2>{{ option.optionTitle }}</h2>
            <span @click="showPollOption(option.id, option.optionTitle)" class="optIcon"><i class="fas fa-edit"></i></span>
            <span class="optIcon" @click="deletePollOption(option.id)" v-if="poll.optionList.length > 3"><i class="fas fa-trash"></i></span>
        </div>
    </div>

    <div class="addBtn">
        <button class="addPoll" @click="showAddBtn">Add poll</button>
    </div>
</div>
</template>

<script>
import {
    useStore
} from "vuex";
import {
    onMounted
} from "vue";
import {
    pollApi
} from "../composable/pollApi";

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
            showAddBtn

        } = pollApi();

        onMounted(async () => {
            console.log("Getting poll list...");
            try {
                await store.dispatch("getAllPoll", {
                    page: 1,
                    limit: 4,
                });
            } catch (error) {
                console.log(error);
            }
        });

        return {
            polls,
            deletePoll,
            updatePoll,
            deletePollOption,
            showPollOption,
            showAddBtn
        };
    }

};
</script>

<style scoped>
.addPoll {
    position: absolute;
    top: 21%;
    right: 40px;
    color: white;
    background-color: blue;
    border: none;
    width: 7%;
    padding: 10px;
    font-size: 17px;
    border-radius: 10px;
    cursor: pointer
}
</style>
