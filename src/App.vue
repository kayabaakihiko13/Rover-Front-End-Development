<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserHeader from "@/components/user/UserHeader.vue";
import { ROUTES, STORAGE_KEYS } from "@/constants";

const route = useRoute();
const router = useRouter();
const isRedirecting = ref(false); // Flag untuk hindari double redirect

const showUserHeader = computed(() => {
  return !route.path.startsWith("/admin");
});

// Helper: Show notification (ganti alert dengan yang lebih user-friendly)
const showNotification = (message, type = "warning") => {
  if (import.meta.env.DEV) {
    console.warn(`[${type.toUpperCase()}] ${message}`);
  }
};

// Handler untuk User Token Expired
const handleUserAuthExpired = () => {
  const hasToken = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  if (hasToken) return;
  if (isRedirecting.value) return;
  if (route.path === ROUTES.LOGIN) return;
  
  isRedirecting.value = true;
  
  showNotification("Sesi Anda telah berakhir. Silakan login kembali.", "warning");
  
  setTimeout(() => {
    isRedirecting.value = false;
  }, 1500);
};

// Handler untuk Admin Token Expired
const handleAdminAuthExpired = () => {
  const hasAdminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  if (hasAdminToken) return;
  if (isRedirecting.value) return;
  if (route.path === ROUTES.ADMIN_LOGIN) return;
  
  isRedirecting.value = true;
  
  showNotification("Sesi Admin telah berakhir.", "warning");
  
  setTimeout(() => {
    isRedirecting.value = false;
  }, 1500);
};

onMounted(() => {
  window.addEventListener("auth-changed", handleUserAuthExpired);
  window.addEventListener("admin-auth-changed", handleAdminAuthExpired);
});

onUnmounted(() => {
  // Cleanup listener with funcntion refence 
  window.removeEventListener("auth-changed", handleUserAuthExpired);
  window.removeEventListener("admin-auth-changed", handleAdminAuthExpired);
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