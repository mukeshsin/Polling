<template>
  <div class="formContainer">
    <h2 class="poll-head">Poll-System</h2>
    <p class="poll-para">Here you can give vote</p>
    <div class="mainPole" v-if="polls">
      <div class="poll" v-for="poll in polls" :key="poll.id">
        <div class="pollHead">
          <h3>{{poll.title}}</h3>
        </div>
        <div class="pollIcon">
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pollApi } from '../composable/pollApi'

export default {
  name: "pollList",
  setup() {
    return {
      ...pollApi()
    }
  }
}
</script>

<style scoped>
</style>
