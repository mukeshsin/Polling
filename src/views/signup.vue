<template>
<div class="formWrapper">
    <div class="wrap">
        <h3 class="head">Signup Form</h3>
        <p class="headPara">Please enter details to create a new user</p>
        <form @submit.prevent="formSubmit">
            <label class="formLabel">Firstname</label>
            <input type="text" v-model="signupData.firstName" />
            <div v-if="signupData.firstNameError" class="error">{{ signupData.firstNameError }}</div>
            <div v-if="!signupData.firstNameError && signupData.formSubmitted" class="formLabel error">
                First name must be at least 4 characters long
            </div>
            <label class="formLabel">Lastname</label>
            <input type="text" v-model="signupData.lastName" />
            <div v-if="signupData.lastNameError" class="error">{{ signupData.lastNameError }}</div>
            <div v-if="!signupData.lastNameError && signupData.formSubmitted" class="formLabel error">
                Last name must be at least 4 characters long
            </div>
            <label class="formLabel">Password</label>
            <input type="password" v-model="signupData.password" />
            <div v-if="signupData.passwordError" class="error">{{ signupData.passwordError }}</div>
            <div v-if="!signupData.passwordError && signupData.formSubmitted" class="formLabel error">
                Password must contain at least 8 characters
            </div>
            <label class="formLabel">Email</label>
            <input type="email" v-model="signupData.email" />
            <div v-if="signupData.emailError" class="error">{{ signupData.emailError }}</div>
            <div v-if="!signupData.emailError && signupData.formSubmitted" class="formLabel error">
                Please enter a valid email
            </div>

            <label class="formLabel">Role</label>
            <input type="text" v-model="signupData.roleId" />
            <div v-if="signupData.roleIdError" class="error">{{ signupData.roleIdError }}</div>
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
</div>
</template>

<script>
import {
    loginApi
} from '../composable/loginApi.js';

export default {
    name: 'signUpPage',
    setup() {
        const {
            signupData,
            formSubmit,

        } = loginApi();
        return {
            signupData,
            formSubmit,

        };
    },
};
</script>
