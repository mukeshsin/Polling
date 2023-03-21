<template>
<div class="formWrapper" >
    <h3 class="poll-head">Add Poll</h3>
    <p class="poll-para">Here add a new poll</p>
    <form @submit.prevent="createPoll">
        <label class="pollLabel">Poll Title:</label>
        <input type="text" class="pollInput" placeholder="add title for poll" />
        <label class="pollLabel">Poll Options:</label>

        <div class="inputWrap">
            <input type="text" class="pollInput" placeholder="add option for poll" />
            <div class="pollIcon" @click="addOptions">
                <i class="fa fa-add addIcon"></i>
            </div>
        </div>

        <h4 class="optionsPoll">

            <span class="editPollIcon" @click="editNewOption(option)"><i class="fas fa-edit"></i></span>
            <span class="deletePollIcon" @click="deleteNewOption(option)"><i class="fa fa-trash"></i></span>
        </h4>

        <button type="submit" class="pollBtn" @click="addNewPOLL">Add new Poll</button>

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

<style scoped></style>
