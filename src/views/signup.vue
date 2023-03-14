<template>
<div class="signup-box">
    <h1 class="head">Signup Form</h1>
    <h4 class="headPara">Please enter details to create a new user</h4>
    <form @submit.prevent="handleSignup">
        <label>First name</label>
        <input type="text" class="formInput" v-model="signupData.firstName" />

        <label class="formLabel">Last name</label>
        <input type="text" class="formInput" v-model="signupData.lastName" />

        <label class="formLabel">Password</label>
        <input type="password" class="formInput" v-model="signupData.password" />

        <label class="formLabel">Email</label>
        <input type="email" class="formInput" v-model="signupData.email" />

        <label class="formLabel">Role</label>
        <select class="selectBox" v-model="signupData.roleId" required>
            <option>Select A Role</option>
            <template v-for="role in roles" :key="role.id">
                <option :value="role.id">{{ role.name }}</option>
            </template>
        </select>

        <div class="formCheck">
            <input type="checkbox" v-model="signupData.term" />
            <label class="checkboxlabel">ACCEPT TERMS AND CONDITIONS</label>
        </div>
        <span class="errors">{{ signUpErr }}</span>

        <button type="submit" class="submitBtn">
            <span v-if="isLoading"><i class="fa fa-spinner fa-spin"></i></span>
            Create an account
        </button>
    </form>
</div>
<div class="ajdustToast">
    <successToast v-if="isSubmitted">
        <template v-slot:content>You have successfully registered</template>
    </successToast>
</div>
</template>

<script>
import {
    fetchApi
} from "../composable/loginApi.js";
import successToast from "../components/successToast.vue";

export default {
    name: "SignUpPage",
    components: {
        successToast,
    },
    setup() {
        return {
            ...fetchApi(),
        };
    },
};
</script>
