<template>
<div class="formWrapper">
    <div class="wrap">
        <h3 class="head">Signup Form</h3>
        <p class="headPara">Please enter details to create a new user</p>
        <form @submit.prevent="formSubmit">
            <label class="formLabel">Firstname</label>
            <input type="text" v-model="signupData.firstName" />
            <div v-if="firstNameError" class="error">{{ signupData.firstNameError }}</div>
            <div v-if="!firstNameError && formSubmitted" class="formLabel error">
                First name must be at least 4 characters long
            </div>
            <label class="formLabel">Lastname</label>
            <input type="text" v-model="signupData.lastName" />
            <div v-if="lastNameError" class="error">{{ signupData.lastNameError }}</div>
            <div v-if="!lastNameError && formSubmitted" class="formLabel error">
                Last name must be at least 4 characters long
            </div>
            <label class="formLabel">Password</label>
            <input type="password" v-model="signupData.password" />
            <div v-if="passwordError" class="error">{{ signupData.passwordError }}</div>
            <div v-if="!passwordError && formSubmitted" class="formLabel error">
                password must be contain 8 character
            </div>
            <label class="formLabel">Email</label>
            <input type="email" v-model="signupData.email" />
            <div v-if="!emailError && formSubmitted" class="formLabel error">
                Please enter a valid email
            </div>
            <div v-if="emailError" class="error">{{ signupData. emailError }}</div>
            <label class="formLabel">Role</label>
            <input type="text" v-model="signupData.roleId" />
            <div v-if="roleIdError" class="error">{{ signupData.roleIdError }}</div>
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
import {
    signUp
} from '../composable/loginApi.js'
export default {
    name: "signUpPage",
    setup() {

        const {
            signupData,
            formSubmit
        } = signUp();
        return {
            signupData,
            formSubmit,
            firstNameError: "",
            lastNameError: "",
            passwordError: "",
            emailError: "",
            roleIdError: "",
        }

    }
}
</script>
