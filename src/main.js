import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/style.css";
import{authHeader } from "./utils/authHeader";

createApp(App).use(store).use(router).use(authHeader).mount("#app");
