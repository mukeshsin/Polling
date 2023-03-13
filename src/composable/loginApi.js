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

  const isSubmitted = ref(false);

  //get roles
  const roles = computed(() => {
    return store.state.roles;
  });

  //get user
  const user = computed(() => {
    return store.state.user;
  });

  onMounted(async () => {
    await store.dispatch("getRoles");
    store.commit("setUser");
  });

  onMounted(() => {
    store.state.loginError = null;
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
          signUpErr.value = "";
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
              router.replace({ path: "/login" });
            } else {
              signUpErr.value = "Email already exists.Try something else";
            }
          } catch (error) {
            console.log(error);
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
  const formSubmit = () => {
    isSubmitted.value = false;
    router.push({ name: "/login" });
  };

  const handleLogin = async () => {
    try {
      await store.dispatch("login", {
        email: signupData.email,
        password: signupData.password,
      });
      if (!loginError.value) {
        router.replace({ path: "/" });
      }
      console.log("User login  successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    roles,
    signupData,
    isSubmitted,
    formSubmit,
    handleLogin,
    loginError,
    signUpErr,
    handleSignup,
    loginBtn,
  };
};
