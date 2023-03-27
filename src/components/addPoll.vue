<template>
<div class="formContainer">
    <h3 class="pollHead">Add Poll</h3>
    <p class="poll-para">Create new Poll</p>
    <form>
        <label class="pollLabel">Poll Title</label>
        <input type="text" class="pollInput" v-model="newPoll.title" />
        <label class="pollLabel">Poll Options</label>

        <div class="inputWrap">
            <input type="text" class="pollInput" v-model="option" />
            <div class="pollIcon" @click="addOptions">
                <i class="fa fa-plus addIcon"></i>
            </div>
        </div>

        <div class="option" v-for="option in newPoll.options" :key="option">
            <span>{{option}}</span>
            <span class="editPollIcon" @click="editNewOption(option)"><i class="fas fa-edit"></i></span>
            <span class="deletePollIcon" @click="deleteNewOption(option)"><i class="fa fa-trash"></i></span>
        </div>
        <span class="addError">{{pollError}}</span>
        <div>
            <button type="submit" class="pollBtn" @click=" addNewPoll">Submit</button>
            <button type="submit" class="cancelBtn" @click="viewPolls">Cancel</button>
        </div>
    </form>

</div>
</template>

<script>
import {
    pollApi
} from "../composable/pollApi";
export default {
    name: "addPoll",
    setup() {
        return {
            ...pollApi(),
        };
    },

};
</script>

<style scoped>
.pollIcon i {
    margin-left: 95%;
    margin-top: 20px;
}


</style>
