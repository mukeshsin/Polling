<template>
<nav>
    <router-link to="/signup">Signup</router-link> |
    <router-link to="/login">Login</router-link>
</nav>
</template>

<script>
export default {
    name: "nav-bar"

}
</script>

<style scoped>


nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
