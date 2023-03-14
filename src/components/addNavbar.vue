<template>
<nav>
    <router-link to="/signup">Signup</router-link> |
    <router-link to="/login">Login</router-link>
</nav>
</template>

<script>
export default {
    name: "nav-bar",
};
</script>

<style scoped>
nav {
    padding: 20px;
    margin-right: 35px;
}

nav a {
    font-weight: bold;
    font-size: 20px;
    color: #2c3e50;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: #42b983;
    text-decoration: underline;
}
</style>
