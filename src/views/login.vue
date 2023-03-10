<template>
<div class="formWrapper">
    <div class="wrap">
        <h2 class="head">Log in</h2>
        <p class="headPara">Here login an existing user</p>
        <form @submit.prevent="handleLogin">
            <label class="formLabel">Email</label>
            <input type="email" class="formInput" placeholder="Please enter email" v-model="signupData.email" />
            <span v-if="signupData.emailError" class="error">{{ signupData.emailError }}</span>
            <div v-if="!signupData.emailError && signupData.formSubmitted" class="formLabel error">
                Please enter a valid email
            </div>
            <label class="formLabel">Password</label>
            <input type="password" class="formInput" placeholder="Please enter valid password" v-model="signupData.password" />
            <span v-if="signupData.passwordError" class="error">{{ signupData.passwordError }}</span>
            <div v-if="!signupData.passwordError && signupData.formSubmitted" class="formLabel error">
                Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character
            </div>
            <button type="submit" class="submitBtn">Login</button>
        </form>
    </div>
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
            handleLogin
        } = loginApi();
        return {
            signupData,
            handleLogin,
        };
    },
};
</script>

<style scoped></style>
