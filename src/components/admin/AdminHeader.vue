<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAdminAuth, emitAdminAuthChange } from "@/composables/useAdminAuth";
import { ROUTES } from "@/constants";

const router = useRouter();
const route = useRoute();
const { adminUsername } = useAdminAuth();

const handleLogout = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_username");
  emitAdminAuthChange();
  router.push(ROUTES.ADMIN_LOGIN);
};

const menuItems = [
  { path: ROUTES.ADMIN_DASHBOARD, label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { path: ROUTES.ADMIN_ANALYTICS, label: "Analitik", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { path: ROUTES.ADMIN_HARVEST, label: "Hasil Panen", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" },
  { path: ROUTES.ADMIN_USERS, label: "Pengguna", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
];

const isActive = (path) => route.path === path;
</script>

<template>
  <header class="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-10">
    <div class="flex items-center gap-6">
      <router-link :to="ROUTES.ADMIN_DASHBOARD" class="flex items-center gap-2">
        <img class="w-8 h-8 rounded-lg" src="@/assets/icons/logo.png" alt="Logo" />
        <span class="font-bold text-green-800 text-lg">Rover Admin</span>
      </router-link>
      
      <nav class="hidden md:flex items-center gap-1">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            isActive(item.path)
              ? 'bg-green-100 text-green-800'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          {{ item.label }}
        </router-link>
      </nav>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
          <span class="text-white text-sm font-medium">{{ adminUsername?.charAt(0).toUpperCase() }}</span>
        </div>
        <span class="text-sm font-medium text-gray-700 hidden sm:block">{{ adminUsername }}</span>
      </div>
      
      <button
        @click="handleLogout"
        class="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Keluar"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="hidden sm:inline">Keluar</span>
      </button>
    </div>
  </header>
</template>
