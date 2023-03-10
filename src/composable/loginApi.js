import { reactive } from "vue";
import { useStore } from "vuex";

export const loginApi = () => {
  const store = useStore();
  const signupData = reactive({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roleId: "default",
    term: false,
    formSubmitted: false,
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    emailError: "",
    roleIdError: "",
  });

  // for signup
  const formSubmit = async () => {
    try {
      await store.dispatch("signup", {
        email: signupData.email,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        roleId: signupData.roleId,
        password: signupData.password,
      });
      console.log("user created successfully");
    } catch (error) {
      console.error(error);
    }
    // Firstname validation
    if (signupData.firstName.length < 4) {
      signupData.firstNameError =
        "First name must contain at least 4 characters";
    } else {
      signupData.firstNameError = "";
    }
    // Lastname validation
    if (signupData.lastName.length < 4) {
      signupData.lastNameError = "Last name must contain at least 4 characters";
    } else {
      signupData.lastNameError = "";
    }
    // Password validation
    let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordReg.test(signupData.password)) {
      signupData.passwordError =
        "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character";
    } else {
      signupData.passwordError = "";
    }
    // Email validation
    let emailReg = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (!emailReg.test(signupData.email)) {
      signupData.emailError = "Please enter a valid email";
    } else {
      signupData.emailError = "";
    }
    // Role ID validation
    if (signupData.roleId === "") {
      signupData.roleIdError = "Role ID cannot be empty";
    } else {
      signupData.roleIdError = "";
    }

    if (
      !signupData.firstNameError ||
      !signupData.lastNameError ||
      !signupData.passwordError ||
      !signupData.emailError ||
      !signupData.roleIdError
    ) {
      return;
    }

    signupData.formSubmitted = true;
  };

  // for login

  const handleLogin = async () => {
    try {
      await store.dispatch("login", {
        email: signupData.email,
        password: signupData.password,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return { signupData, formSubmit, handleLogin };
};
