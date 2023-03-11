<template>
<div class="login-box">
    <h2 class="head">Log in</h2>
    <p class="headPara">Here login an existing user</p>
    <form @submit.prevent="handleLogin">
        <label class="formLabel">Email</label>
        <input type="email" class="formInput" v-model="signupData.email" />
        <label class="formLabel">Password</label>
        <input type="password" class="formInput" v-model="signupData.password" />
        <span class="errors">{{loginError}}</span>
        <button type="submit" class="submitBtn">Login</button>
    </form>

</div>
</template>

<script>
import {
    loginApi
} from "../composable/loginApi.js";

export default {
    name: "logInPage",
    setup() {
        const {
            signupData,
            handleLogin,
            loginError
        } = loginApi();
        return {
            signupData,
            handleLogin,
            loginError
        };
    },
};
</script>

<style scoped></style>
