import { ref } from "vue";
import { STORAGE_KEYS,ROUTES } from "@/constants";
import router from "@/router";

const isLoggedIn = ref(false);
const username = ref(null);

const syncAuth = () => {
    const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN); 
    isLoggedIn.value = !!token;
    username.value = localStorage.getItem(STORAGE_KEYS.USER_USERNAME);
};

syncAuth();

export const emitAuthChange = () => {
    window.dispatchEvent(new Event("auth-changed"));
};

window.addEventListener("auth-changed", syncAuth);

export const logout = (redirect = true) =>{
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_USERNAME);
    isLoggedIn.value = false;
    username.value = null;
    emitAuthChange();
    if(redirect){
        router.push({
            path:ROUTES.LOGIN,
            query:{session:"expired"}
        });
    }
}

export const useAuth = () => {
    return {
        isLoggedIn,
        username,
        syncAuth,
        logout
    }
}

export const userAuth = useAuth;