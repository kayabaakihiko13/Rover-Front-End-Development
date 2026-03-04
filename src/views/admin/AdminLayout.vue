<script setup>
import { onMounted, onUnmounted } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { useAdminAuth, emitAdminAuthChange } from "@/composables/useAdminAuth";
import { ROUTES } from "@/constants";
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminFooter from "@/components/admin/AdminFooter.vue";

const router = useRouter();
const route = useRoute();
const { adminUsername, logout: adminLogout } = useAdminAuth();

const menuItems = [
  { path: ROUTES.ADMIN_DASHBOARD, label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { path: ROUTES.ADMIN_ANALYTICS, label: "Analitik", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { path: ROUTES.ADMIN_HARVEST, label: "Hasil Panen", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" },
  { path: ROUTES.ADMIN_USERS, label: "Pengguna", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
];

const handleLogout = () => {
  adminLogout();
  router.push(ROUTES.ADMIN_LOGIN);
};

const handleAuthChange = () => {
  const token = localStorage.getItem("admin_token");
  if (!token) {
    router.push(ROUTES.ADMIN_LOGIN);
  }
};

onMounted(() => {
  window.addEventListener("admin-auth-changed", handleAuthChange);
});

onUnmounted(() => {
  window.removeEventListener("admin-auth-changed", handleAuthChange);
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <AdminHeader />
    
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-64 bg-green-800 text-white flex flex-col fixed h-[calc(100vh-4rem)] top-16">
        <nav class="flex-1 p-4 overflow-y-auto">
          <RouterLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors',
              route.path === item.path
                ? 'bg-green-700 text-white'
                : 'text-green-100 hover:bg-green-700 hover:text-white'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
            </svg>
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="p-4 border-t border-green-700">
          <button
            @click="handleLogout"
            class="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-green-100 hover:bg-green-700 hover:text-white transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 ml-64 flex flex-col">
        <main class="flex-1 p-6">
          <RouterView />
        </main>
        <AdminFooter />
      </div>
    </div>
  </div>
</template>
