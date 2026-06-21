<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import UserHeader from "@/components/user/UserHeader.vue";
import { ROUTES, STORAGE_KEYS } from "@/constants";

const route = useRoute();
const router = useRouter();
const isRedirecting = ref(false); // Flag untuk hindari double redirect

const showUserHeader = computed(() => {
  return !route.path.startsWith("/admin");
});

// membuat function token Expired
const isTokenExpired = (token) =>{
  if(!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < (Date.now() / 1000 - 10);
  } catch {
      return true;
  }
}

// Handler untuk User Token Expired
const handleUserAuthExpired = () => {
  const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN)
  const expired = !token || isTokenExpired(token)
  if (!expired || isRedirecting.value || route.path === ROUTES.LOGIN) return

  localStorage.removeItem(STORAGE_KEYS.USER_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.USER_USERNAME)
  window.dispatchEvent(new Event("auth-changed"))

  isRedirecting.value = true
  setTimeout(() => {
    isRedirecting.value = false
    router.push({ path: ROUTES.LOGIN, query: { session: "expired" } })
  }, 1500)
}


// Handler untuk Admin Token Expired
const handleAdminAuthExpired = () => {
  const hasAdminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  if (hasAdminToken) return;
  if (isRedirecting.value) return;
  if (route.path === ROUTES.ADMIN_LOGIN) return;
  
  isRedirecting.value = true;
  
  setTimeout(() => {
    isRedirecting.value = false;
  }, 1500);
};

let intervalId
onMounted(() => {
  window.addEventListener("auth-changed", handleUserAuthExpired);
  window.addEventListener("admin-auth-changed", handleAdminAuthExpired);
  intervalId = setInterval(handleUserAuthExpired, 5 * 60 * 1000);
});

onUnmounted(() => {
  window.removeEventListener("auth-changed", handleUserAuthExpired);
  window.removeEventListener("admin-auth-changed", handleAdminAuthExpired);
  clearInterval(intervalId);
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- User Header - Only show for non-admin routes -->
    <UserHeader v-if="showUserHeader" />
    
    <!-- Main Section -->
    <main :class="showUserHeader ? 'flex-grow pt-16' : 'flex-grow'">
      <RouterView />
    </main>

  </div>
</template>