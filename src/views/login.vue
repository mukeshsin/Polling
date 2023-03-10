<template>
  <div class="formWrapper">
    <div class="wrap">
      <h2 class="head">Log in</h2>
      <p class="headPara">Here login an existing user</p>
      <form @submit.prevent="handleLogin">
        <label class="formLabel"> Email Id:</label>
        <input type="email" class="formInput" placeholder="please enter email" v-model="email" />
        <span v-if="emailError" class="error">{{ emailError }}</span>
        <label class="formLabel"> Password:</label>
        <input type="password" class="formInput" placeholder="please enter Valid password" v-model="password" />
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
        <button type="submit" class="submitBtn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>

import {
    loginApi
} from '../composable/loginApi.js';

export default {
    name: 'logInPage',
    setup() {
        const {
            signupData,
            formSubmit,
            handleLogin

        } = loginApi();
        return {
            signupData,
            formSubmit,
            handleLogin

        };
    },
};
</script>

<style scoped>
</style>
