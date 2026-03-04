import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./composables/useAuth";

if (!import.meta.env.VITE_BACKEND_URL) {
  console.warn("VITE_BACKEND_URL is not defined in .env");
}

createApp(App).use(router).mount("#app");
