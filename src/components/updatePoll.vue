<template>
<div class="formContainer">
    <form @click="updatePollTitle">
        <label for="title">Title:</label>
        <input type="text" id="title">
        <button type="submit">Update</button>
    </form>

</div>
</template>

<script>
import { pollApi } from '../composable/pollApi'
export default {
    name: 'updatePoll',

    setup(){
    return{
        ...pollApi()
    }
    }
}
</script>

<style scoped>

</style>
