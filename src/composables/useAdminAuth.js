import { ref } from "vue";
import { STORAGE_KEYS } from "@/constants";

const isAdminLoggedIn = ref(false);
const adminUsername = ref(null);

const syncAdminAuth = () => {
  const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  isAdminLoggedIn.value = !!token;
  adminUsername.value = localStorage.getItem(STORAGE_KEYS.ADMIN_USERNAME);
};

syncAdminAuth();

export const emitAdminAuthChange = () => {
  window.dispatchEvent(new Event("admin-auth-changed"));
};

window.addEventListener("admin-auth-changed", syncAdminAuth);

export const useAdminAuth = () => {
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USERNAME);
    emitAdminAuthChange();
    syncAdminAuth();
  };

  return {
    isAdminLoggedIn,
    adminUsername,
    syncAdminAuth,
    logout,
  };
};
