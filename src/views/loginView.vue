<template>
<div class="formWrapper">
    <div class="wrap">
        <h2 class="head">Log in</h2>
        <p class="headPara">Here login an existing user</p>
        <form @submit.prevent="formSubmit">
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
import axios from "axios";
import router from "@/router";
export default {
    name: "logPage",
    data() {
        return {
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
        };
    },
    methods: {
        formSubmit() {
            // Email validation
            let emailReg = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
            if (!emailReg.test(this.email)) {
                this.emailError = "Please enter a valid email";
            } else {
                this.emailError = "";
            }
            // Password validation
            if (this.password.length < 8) {
                this.passwordError = "Password must contain at least 8 characters";
            } else {
                this.passwordError = "";
            }
            if (!this.emailError && !this.passwordError) {
                const loginData = {
                    email: this.email,
                    password: this.password,
                };
                axios
                    .post("https://pollapi.innotechteam.in/user/login", loginData)
                    .then((response) => {
                        console.log(response.data);
                        // set auth token to localStorage or cookies
                        localStorage.setItem("token", response.data.token);
                        router.push("/home "); // redirect to dashboard page
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
            }
        },
    },
};
</script>
<style scoped>
</style>
