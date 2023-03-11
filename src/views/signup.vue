<template>
<div class="signup-box">
    <h1 class="head">Signup Form</h1>
    <h4 class="headPara">Please enter details to create a new user</h4>
    <form @submit.prevent="formSubmit">
        <label>First name</label>
        <input type="text" v-model="signupData.firstName" />
        <div v-if="signupData.firstNameError" class="error">
            {{ signupData.firstNameError }}
        </div>
        <div v-if="!signupData.firstNameError && signupData.formSubmitted" class="formLabel error">
            First name must be at least 4 characters long
        </div>
        <label class="formLabel">Last name</label>
        <input type="text" v-model="signupData.lastName" />
        <div v-if="signupData.lastNameError" class="error">
            {{ signupData.lastNameError }}
        </div>
        <div v-if="!signupData.lastNameError && signupData.formSubmitted" class="formLabel error">
            Last name must be at least 4 characters long
        </div>
        <label class="formLabel">Password</label>
        <input type="password" v-model="signupData.password" />
        <div v-if="signupData.passwordError" class="error">
            {{ signupData.passwordError }}
        </div>
        <div v-if="!signupData.passwordError && signupData.formSubmitted" class="formLabel error">
            Password must contain at least 8 characters
        </div>
        <label class="formLabel">Email</label>
        <input type="email" v-model="signupData.email" />
        <div v-if="signupData.emailError" class="error">
            {{ signupData.emailError }}
        </div>
        <div v-if="!signupData.emailError && signupData.formSubmitted" class="formLabel error">
            Please enter a valid email
        </div>
        <label class="formLabel">Role</label>
        <select class="selectBox" v-model="signupData.roleId ">
            <option value="">Select a Role </option>
            <option value="1">Admin</option>
            <option value="2">User</option>
        </select>
        <div v-if="signupData.roleIdError" class="error">
            {{ signupData.roleIdError }}
        </div>
        <div v-if="!signupData.roleIdError && signupData.formSubmitted" class="formLabel error">
            Role ID cannot be empty
        </div>

        <div class="formCheck">
            <input type="checkbox" v-model="signupData.term" />
            <label class="checkboxlabel">ACCEPT TERMS AND CONDITIONS</label>
        </div>

        <button type="submit" class="submitBtn">Create an account</button>
    </form>

</div>
</template>

<script>
import {
    loginApi
} from "../composable/loginApi.js";

export default {
    name: "signUpPage",
    setup() {
        return {
            ...loginApi(),
        };
    },
};
</script>
