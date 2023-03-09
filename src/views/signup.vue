<template>
<div class="formWrapper">
    <div class="wrap">
        <h3 class="head">Signup Form</h3>
        <p class="headPara">Please enter details to create a new user</p>
        <form @submit.prevent="formSubmit">
            <label class="formLabel">Firstname</label>
            <input type="text" v-model="signupData.firstName" />
            <div v-if="firstNameError" class="error">{{ firstNameError }}</div>
            <div v-if="!firstNameError && formSubmitted" class="formLabel error">
                First name must be at least 4 characters long
            </div>
            <label class="formLabel">Lastname</label>
            <input type="text" v-model="signupData.lastName" />
            <div v-if="lastNameError" class="error">{{ lastNameError }}</div>
            <div v-if="!lastNameError && formSubmitted" class="formLabel error">
                Last name must be at least 4 characters long
            </div>
            <label class="formLabel">Password</label>
            <input type="password" v-model="signupData.password" />
            <div v-if="!passwordError && formSubmitted" class="formLabel error">
                password must be contain 8 character
            </div>
            <label class="formLabel">Email</label>
            <input type="email" v-model="signupData.email" />
            <div v-if="!emailError && formSubmitted" class="formLabel error">
                Please enter a valid email
            </div>
            <div v-if="emailError" class="error">{{ emailError }}</div>
            <label class="formLabel">Role</label>
            <input type="text" v-model="signupData.roleId" />
            <div v-if="roleIdError" class="error">{{ roleIdError }}</div>
            <div v-if="!roleIdError && formSubmitted" class="formLabel error">
                Role ID cannot be empty
            </div>
            <div class="formCheck">
                <input type="checkbox" v-model="signupData.term" />
                <label class="checkboxlabel">ACCEPT TERMS AND CONDITIONS</label>
            </div>
            <button type="submit" class="submitBtn">Create an account</button>
        </form>
    </div>
</div>
</template>
<script>
import axios from "axios";
import router from "@/router";
export default {
    name: "signupCard",
    data() {
        return {
            signupData: {
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                roleId: "",
                term: false,
            },
            formSubmitted: false,
            firstNameError: "",
            lastNameError: "",
            passwordError: "",
            emailError: "",
            roleIdError: "",
        };
    },
    methods: {
        formSubmit() {
            axios
                .post("https://pollapi.innotechteam.in/user/register", this.signupData)
                .then((response) => {
                    console.log(response.data);
                     router.push("/loginCard"); // redirect to login page
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            // Firstname validation
            if (this.signupData.firstName.length < 4) {
                this.firstNameError = " First name must be contain 4 character";
            } else {
                this.firstNameError = "";
            }
            // Lastname validation
            if (this.signupData.lastName.length < 4) {
                this.lastNameError = "Last name must be contain 4 character";
            } else {
                this.lastNameError = "";
            }
            // Password validation
            let passwordReg =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
            if (!passwordReg.test(this.signupData.password)) {
                this.passwordError =
                    "Password must contain at least 8 characters ";
            } else {
                this.passwordError = "";
            }
            // Email validation
            let emailReg = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
            if (!emailReg.test(this.signupData.email)) {
                this.emailError = "Please enter a valid email";
            } else {
                this.emailError = "";
            }
            // Role ID validation
            if (this.signupData.roleId === "") {
                this.roleIdError = "Role ID cannot be empty";
            } else {
                this.roleIdError = "";
            }
        },
    },
};
</script>