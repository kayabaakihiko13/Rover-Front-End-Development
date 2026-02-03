<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { emitAuthChange } from "../utils/auth";
import {useAuth} from "../utils/userAuth"
const router = useRouter();
const open = ref(false);
const { username, isLoggedIn, syncAuth } = useAuth();
// Fungsi untuk ambil username terbaru dari localStorage
const refreshUser = () => {
  username.value = localStorage.getItem("username");
};

// panggil saat component dimount
onMounted(() => {
  refreshUser();

  // listen event ketika localStorage di tab lain berubah
  window.addEventListener("storage", refreshUser);
});

// cleanup event listener saat component di-unmount
onBeforeUnmount(() => {
  window.removeEventListener("storage", refreshUser);
});

// Logout function
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username"); 
  emitAuthChange();
  syncAuth();
  router.replace("/login");
};
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link :to="username ? '/dashboard' : '/'" class="flex items-center">
            <img class="w-10 h-10 rounded-lg shadow-sm" src="../assets/vue.svg" alt="PalmDetector Logo" />
            <span class="ml-2 font-bold text-green-700 text-xl tracking-wide">PalmDetector</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-4">
          <div v-if="username" class="flex items-center space-x-4">
            <span class="text-gray-700 font-medium">Hi, {{ username }}</span>
            <button @click="logout" class="text-gray-500 hover:text-red-600">Logout</button>
          </div>

          <div v-else class="flex items-center space-x-4">
            <router-link to="/login" class="text-gray-700 hover:text-green-700 font-medium">Masuk</router-link>
            <router-link to="/register" class="text-gray-700 hover:text-green-700 font-medium">Daftar</router-link>
          </div>
        </div>

        <!-- Mobile Button -->
        <button @click="open = !open" class="md:hidden text-gray-700 hover:text-green-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="open" class="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-inner">
      <div v-if="username">
        <span class="block px-3 py-2 text-gray-700 font-medium">Hi, {{ username }}</span>
        <button @click="logout" class="block px-3 py-2 text-gray-500 hover:text-red-600 w-full text-left">Logout</button>
      </div>
      <div v-else>
        <router-link to="/login" class="block px-3 py-2 text-gray-700 hover:text-green-700 font-medium">Masuk</router-link>
        <router-link to="/register" class="block px-3 py-2 text-gray-700 hover:text-green-700 font-medium">Daftar</router-link>
      </div>
    </div>
  </nav>
</template>
