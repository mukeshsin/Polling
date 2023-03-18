<template>
<div class="poll" v-if="poll">
    <div class="pollIcon">
        <span @click="viewPolls"><i class="fa-sharp fa-solid fa-arrow-left"></i></span>
    </div>
    <div class="pollHead">
        <h3>{{ poll.title }}</h3>
    </div>
</div>
</template>

<script>
export default {
    name: "showPoll"
}
</script>

<style scoped>

</style>
