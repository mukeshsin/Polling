import { reactive, computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export const fetchApi = () => {
  const store = useStore();
  const router = useRouter();
  const signupData = reactive({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roleId: "null",
    term: false,
  });

  const isLoading = ref(false);
  const isSubmitted = ref(false);

  //get roles
  const roles = computed(() => {
    return store.state.roles;
  });

  const isValidRoleId = computed(() => {
    return roles.value.some((role) => role.id === signupData.roleId);
  });

  // get users
  const user = computed(() => {
    return store.state.user;
  });

  onMounted(async () => {
    await store.dispatch("getRoles");
    store.commit("setUser");
  });

  //errors
  const signUpErr = ref("");
  const signupError = computed(() => {
    return store.state.signupError;
  });
  const signErr = computed(() => {
    return store.state.signErr;
  });
  const loginError = computed(() => {
    return store.state.loginError;
  });
  const loginBtn = ref(true);
  // for signup
  const handleSignup = async () => {
    if (signupData.firstName.length > 4) {
      if (signupData.lastName.length > 4) {
        if (signupData.password.length > 8) {
          if (signupData.email.length > 0) {
            if (isValidRoleId.value) {
              if (signupData.term) {
                signupError.value = "";
                isLoading.value = true;
                try {
                  await store.dispatch("signup", {
                    email: signupData.email,
                    password: signupData.password,
                    roleId: signupData.roleId,
                    firstName: signupData.firstName,
                    lastName: signupData.lastName,
                  });
                  if (!signupError.value && !signErr.value) {
                    isSubmitted.value = true;
                    setTimeout(() => {
                      router.replace({ path: "/login" });
                      isLoading.value = false;
                    }, "2000");
                  } else {
                    signUpErr.value = "Email already exists.Try something else";
                  }
                } catch (error) {
                  console.log(error);
                }
                isLoading.value = false;
              } else {
                signUpErr.value = "Please accept the terms and conditions";
              }
            } else {
              signUpErr.value = "Please select a role";
            }
          } else {
            signUpErr.value = "Email field is required";
          }
        } else {
          signUpErr.value = "Password length should be greater than 8";
        }
      } else {
        signUpErr.value = "Last name should be greater than 4";
      }
    } else {
      signUpErr.value = "First name length should be greater than 4";
    }
  };

  const handleLogin = async () => {
    try {
      await store.dispatch("login", {
        email: signupData.email,
        password: signupData.password,
      });
      if (!loginError.value) {
        router.replace({ path: "/pollList" });
      }
      console.log("User login  successfully");
    } catch (error) {
      console.error(error);
    }
  };
  //logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    localStorage.removeItem("optionId");
    store.state.polls = [];
    router.push("/login");
  };

  return {
    user,
    roles,
    signupData,
    isSubmitted,
    handleLogin,
    loginError,
    signUpErr,
    signErr,
    handleSignup,
    loginBtn,
    isLoading,
    logout,
  };
};
