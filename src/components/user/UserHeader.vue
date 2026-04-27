<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { userAuth, emitAuthChange } from "@/composables/useAuth";
import { useTheme } from "@/composables/useTheme";

const router = useRouter();
const route = useRoute();

// Theme
const { theme, appliedTheme, setTheme } = useTheme();

// Auth & UI State
const open = ref(false);
const isLoggingOut = ref(false);
const showError = ref(false);
const errorMsg = ref("");

const { username, logout: authLogout } = userAuth();

const isLandingPage = computed(() => route.path === '/' && !username.value);

const refreshUser = () => {
  username.value = localStorage.getItem("username");
};

const closeMobileMenu = () => {
  open.value = false;
};

onMounted(() => {
  refreshUser();
  window.addEventListener("storage", refreshUser);
});

onBeforeUnmount(() => {
  window.removeEventListener("storage", refreshUser);
});

const logout = async () => {
  isLoggingOut.value = true;
  showError.value = false;

  try {
    if (typeof authLogout === 'function') {
      await authLogout();
    }
  } catch (error) {
    const status = error?.response?.status;
    if (status !== 401 && status !== 403) {
      errorMsg.value = "Gagal logout. Cek koneksi internet.";
      showError.value = true;
      setTimeout(() => { showError.value = false; }, 3000);
    }
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    emitAuthChange();
    closeMobileMenu();
    isLoggingOut.value = false;
    await router.replace("/login");
  }
};

const scrollToSection = (sectionId) => {
  closeMobileMenu();
  if (route.path === '/') {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  } else {
    router.push({ path: '/', hash: `#${sectionId}` });
  }
};

// Toggle theme: light <-> dark
const toggleTheme = () => {
  setTheme(appliedTheme.value === 'dark' ? 'light' : 'dark');
};

// Check current applied theme
const isDark = computed(() => appliedTheme.value === 'dark');
</script>

<template>
  <!-- Error Notification -->
  <transition name="fade">
    <div v-show="showError" class="fixed top-20 left-1/2 -translate-x-1/2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg shadow-md text-sm font-medium z-[60]">
      ⚠️ {{ errorMsg }}
    </div>
  </transition>

  <!-- Main Navbar -->
  <nav 
  class="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link :to="username ? '/dashboard' : '/'" class="flex items-center">
            <img class="w-10 h-10 rounded-lg shadow-sm" src="@/assets/icons/logo.png" alt="PalmDetector Logo" />
            <span class="ml-2 font-bold text-green-700 dark:text-green-400 text-xl tracking-wide">PalmDetector</span>
          </router-link>
        </div>

        <!-- Desktop Menu Links -->
        <div v-if="isLandingPage" class="hidden md:flex items-center space-x-8">
          <button @click="scrollToSection('features')" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors">Fitur</button>
          <button @click="scrollToSection('how-it-works')" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors">Cara Kerja</button>
          <button @click="scrollToSection('benefits')" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors">Manfaat</button>
          <button @click="scrollToSection('faq')" class="text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 font-medium transition-colors">FAQ</button>
        </div>

        <!-- Desktop Right Section: Auth + Toggle -->
        <div class="hidden md:flex items-center space-x-4">
          
          <!-- Auth Buttons -->
          <div v-if="username" class="flex items-center space-x-4">
            <span class="text-gray-700 dark:text-gray-200 font-medium">Hi, {{ username }}</span>
            <button 
              @click="logout" 
              :disabled="isLoggingOut"
              class="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ isLoggingOut ? 'Proses...' : 'Logout' }}
            </button>
          </div>
          <div v-else class="flex items-center space-x-3">
            <router-link to="/login" class="text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium transition-colors px-3 py-2">Masuk</router-link>
            <router-link to="/register" class="bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 font-medium transition-all shadow-md hover:shadow-lg">Daftar</router-link>
          </div>

          <!-- 👇 TOGGLE SWITCH (FIXED) -->
          <button 
            @click="toggleTheme"
            class="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"
            :aria-label="isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'"
          >
            <!-- Sun Icon (Left) -->
            <span class="absolute left-1.5 top-1/2 -translate-y-1/2 text-sm transition-opacity duration-300" :class="isDark ? 'opacity-40' : 'opacity-100'">☀️</span>
            
            <!-- Moon Icon (Right) -->
            <span class="absolute right-1.5 top-1/2 -translate-y-1/2 text-sm transition-opacity duration-300" :class="isDark ? 'opacity-100' : 'opacity-40'">🌙</span>
            
            <!-- Sliding Knob -->
            <span 
              class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-in-out"
              :class="isDark ? 'translate-x-7' : 'translate-x-0'"
            >
              <!-- Icon di dalam knob -->
              <span class="text-xs transition-transform duration-300" :class="isDark ? 'rotate-0 scale-100' : 'rotate-0 scale-100'">
                {{ isDark ? '🌙' : '☀️' }}
              </span>
            </span>
          </button>
        </div>

        <!-- Mobile Toggle Button -->
        <div class="md:hidden flex items-center">
          <button @click="open = !open" class="text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 focus:outline-none p-2" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-show="open" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300">
        <div class="px-4 pt-2 pb-4 space-y-1">
          
          <!-- Theme Toggle (Mobile) -->
          <div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-800">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-200">Mode Gelap</span>
            <button 
              @click="toggleTheme"
              class="relative w-12 h-6 rounded-full transition-colors duration-300"
              :class="isDark ? 'bg-gray-700' : 'bg-gray-200'"
              :aria-label="isDark ? 'Matikan dark mode' : 'Nyalakan dark mode'"
            >
              <span class="absolute left-1 top-1/2 -translate-y-1/2 text-xs transition-opacity duration-300" :class="isDark ? 'opacity-40' : 'opacity-100'">☀️</span>
              <span class="absolute right-1 top-1/2 -translate-y-1/2 text-xs transition-opacity duration-300" :class="isDark ? 'opacity-100' : 'opacity-40'">🌙</span>
              <span 
                class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out"
                :class="isDark ? 'translate-x-6' : 'translate-x-0'"
              >
              </span>
            </button>
          </div>

          <!-- Landing Page Links (Mobile) -->
          <template v-if="isLandingPage">
            <button @click="scrollToSection('features')" class="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded font-medium transition-colors">Fitur</button>
            <button @click="scrollToSection('how-it-works')" class="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded font-medium transition-colors">Cara Kerja</button>
            <button @click="scrollToSection('benefits')" class="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded font-medium transition-colors">Manfaat</button>
            <button @click="scrollToSection('faq')" class="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-gray-800 rounded font-medium transition-colors">FAQ</button>
            <div class="border-t border-gray-200 dark:border-gray-800 my-2"></div>
          </template>
          
          <!-- Auth Section (Mobile) -->
          <div v-if="username">
            <div class="px-3 py-2 text-gray-700 dark:text-gray-200 font-medium bg-gray-50 dark:bg-gray-800 rounded">Hi, {{ username }}</div>
            <button 
              @click="logout"
              :disabled="isLoggingOut"
              class="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ isLoggingOut ? 'Proses...' : 'Logout' }}
            </button>
          </div>
          <div v-else class="space-y-2 pt-2">
            <router-link to="/login" @click="closeMobileMenu()" class="block px-3 py-2 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-gray-800 rounded font-medium transition-colors">Masuk</router-link>
            <router-link to="/register" @click="closeMobileMenu()" class="block px-3 py-2 bg-green-600 text-white text-center rounded-xl hover:bg-green-700 font-medium transition-colors">Daftar</router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
<style scoped>
/* Animasi notifikasi error */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>