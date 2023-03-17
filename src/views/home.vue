<template>
  <div>

    <ul>
      <li>
       <router-link to="/addPoll">Add Poll</router-link>
      </li>
      <li>
       <router-link to="/pollList">POll List</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'HomeView',
}
</script>

<style scoped>
.headOne {
  font-size: 23px;
  margin-top: 14px;
}
</style>
