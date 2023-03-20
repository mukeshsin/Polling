<template>
<div class="poll" v-if="poll">
    <div class="pollIcon">
        <span @click="viewPolls"><i class="fa-sharp fa-solid fa-arrow-left"></i></span>
    </div>
    <div class="pollHead">
        <h3>{{ poll.title }}</h3>
    </div>
    <div class="polloptionList" v-for="option in poll.optionList" :key="option.id">
    <input type="checkbox" class="checkboxFix" value="true " />
    <h2>{{ option.optionTitle }}</h2>
    </div>
    
</div>
</template>

<script>
import {
    pollApi
} from "../composable/pollApi";

export default {
    name: "showPoll",
    setup() {
        return {
            ...pollApi(),
        };
    },
};
</script>

<style scoped>

</style>
