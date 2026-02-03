import { ref } from "vue";

const isLoggedIn = ref(false);
const username = ref(null);

const syncAuth = () => {
    const token = localStorage.getItem("token");
    isLoggedIn.value = !!token;
    username.value = localStorage.getItem("username");
};

// INIT SEKALI
syncAuth();

// LISTEN EVENT GLOBAL
window.addEventListener("auth-changed", syncAuth);

export const useAuth = () => {
    return {
        isLoggedIn,
        username,
        syncAuth,
    };
};
