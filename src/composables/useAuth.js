import { ref } from "vue";

const isLoggedIn = ref(false);
const username = ref(null);

const syncAuth = () => {
    const token = localStorage.getItem("token");
    isLoggedIn.value = !!token;
    username.value = localStorage.getItem("username");
};

syncAuth();

export const emitAuthChange = () => {
    window.dispatchEvent(new Event("auth-changed"));
};

window.addEventListener("auth-changed", syncAuth);

export const useAuth = () => {
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        emitAuthChange();
        syncAuth();
    };

    return {
        isLoggedIn,
        username,
        syncAuth,
        logout,
    };
};
