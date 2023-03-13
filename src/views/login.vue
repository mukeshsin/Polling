<template>
<div class="login-box">
    <h1 class="head">Login Form</h1>
    <h4 class="headPara">Here login an existing user</h4>
    <form @submit.prevent="handleLogin">
        <label>Email</label>
        <input type="email" class="formInput" v-model="signupData.email" />
        <label>Password</label>
        <input type="password" class="formInput" v-model="signupData.password" />
        <span class="errors">{{ loginError }}</span>
        <button type="submit" class="loginBtn">Login</button>
    </form>
</div>
</template>

<script>
import {
    fetchApi
} from "../composable/loginApi.js";

export default {
    name: "logInPage",
    setup() {
        const {
            signupData,
            handleLogin,
            loginError
        } = fetchApi();
        return {
            signupData,
            handleLogin,
            loginError,
        };
    },
};
</script>

<style scoped></style>
