<template>
<div class="formWrapper">
    <h3 class="poll-head">Add Poll </h3>
    <p class="poll-para"> Here add a new poll</p>
    <form @submit.prevent="createPoll">
        <label>Poll Title:</label>
        <input type="text" class="pollInput" placeholder="Add a poll title" />
        <label>Poll Options:</label>

        <div class="inputWrap">
            <input type="text" class="pollInput" placeholder="add option for poll" />
            <div class="pollIcon" @click="addOptions">
                <i class="fa fa-add"></i>
            </div>
        </div>

    </form>
</div>
</template>

<script>
export default {
    name: "addPoll",
}
</script>

<style scoped>

</style>
