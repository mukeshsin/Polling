import { reactive } from "vue";
import axios from "axios";
import router from "@/router";

export const signUp = () => {
  const signupData = reactive({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roleId: "",
    term: false,
    formSubmitted: false,
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    emailError: "",
    roleIdError: "",
  });

  const formSubmit = () => {
    axios
      .post("https://pollapi.innotechteam.in/user/register", signupData)
      .then((response) => {
        console.log(response.data);
        router.push("/logInPage");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    // Firstname validation
    if (signupData.signupData.firstName.length < 4) {
      signupData.firstNameError = " First name must be contain 4 character";
    } else {
      signupData.firstNameError = "";
    }
    // Lastname validation
    if (signupData.signupData.lastName.length < 4) {
      signupData.lastNameError = "Last name must be contain 4 character";
    } else {
      signupData.lastNameError = "";
    }
    // Password validation
    let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordReg.test(signupData.signupData.password)) {
      signupData.passwordError = "Password must contain at least 8 characters ";
    } else {
      signupData.passwordError = "";
    }
    // Email validation
    let emailReg = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (!emailReg.test(signupData.signupData.email)) {
      signupData.emailError = "Please enter a valid email";
    } else {
      signupData.emailError = "";
    }
    // Role ID validation
    if (signupData.signupData.roleId === "") {
      signupData.roleIdError = "Role ID cannot be empty";
    } else {
      signupData.roleIdError = "";
    }
  };
  return { signupData, formSubmit };
};
