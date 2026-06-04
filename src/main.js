import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./composables/useAuth";
import './assets/input.css';

createApp(App).use(router).mount("#app");
