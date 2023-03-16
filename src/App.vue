<template>
<div>
    <navbar></navbar>
    <router-view />
</div>
</template>

<script>
import navbar from "./components/addNavbar.vue";
import axios from "axios"

export default {
    name: "App",
    components: {
    navbar,
    },

    created() {
        axios.interceptors.request.use((config) => {
            config.headers.token = JSON.parse(localStorage.getItem("userToken"));
            return config;
        });
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
