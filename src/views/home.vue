<template>
  <div>
    <h1 class="headOne">Welcome to the polling system</h1>
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
.headOne{
  font-size:23px;
  margin-top:14px
}
</style>
