<template>
  <div>
    <h1>Welcome to the polling system</h1>
    <addPoll></addPoll>
  </div>
</template>

<script>
import addPoll from '../components/addPoll.vue'

export default {
  name: 'HomeView',
  components: {
    addPoll,
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
