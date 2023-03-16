<template>
<div>
    <h1 class="headOne">Welcome to the polling system</h1>
    <addPoll></addPoll>
    <br>
    <br>
    <pollList></pollList>
</div>
</template>

<script>
import addPoll from '../components/addPoll.vue'
import pollList from '../components/pollList.vue'
export default {
    name: 'HomeView',
    components: {
        addPoll,
        pollList
    }
}
</script>

<style scoped>
.headOne {
    font-size: 23px;
    margin-top: 14px
}
</style>
