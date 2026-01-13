import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

import "./assets/main.css";

import App from "./App.vue";

// Pinia store
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
