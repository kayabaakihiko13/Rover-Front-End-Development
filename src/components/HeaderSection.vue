<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const open = ref(false);
const router = useRouter();

const props = defineProps({
  username: {
    type: String,
    default: null
  }
});

const logout = () => {
  router.push("/logout");
};
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link
            :to="props.username ? '/dashboard' : '/'"
            class="flex items-center"
          >
            <img
              class="w-10 h-10 rounded-lg shadow-sm"
              src="../assets/vue.svg"
              alt="PalmDetector Logo"
            />
            <span class="ml-2 font-bold text-green-700 text-xl tracking-wide">
              PalmDetector
            </span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-4">

          <!-- Logged in -->
          <div v-if="props.username" class="flex items-center space-x-4">
            <span class="text-gray-700 font-medium">Hi, {{ props.username }}</span>
            <button @click="logout" class="text-gray-500 hover:text-red-600">
              Logout
            </button>
          </div>

          <!-- Not logged in -->
          <div v-else class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="flex items-center text-gray-700 hover:text-green-700 font-medium"
            >
              <i class="fa-solid fa-right-to-bracket mr-1"></i> Masuk
            </router-link>

            <router-link
              to="/register"
              class="flex items-center text-gray-700 hover:text-green-700 font-medium"
            >
              <i class="fa-solid fa-user-plus mr-1"></i> Daftar
            </router-link>
          </div>

        </div>

        <!-- Mobile Button -->
        <button
          @click="open = !open"
          class="md:hidden text-gray-700 hover:text-green-700"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!open"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

      </div>
    </div>

    <!-- MOBILE MENU -->
    <div
      v-show="open"
      class="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-inner"
    >
      <!-- Logged In -->
      <div v-if="props.username">
        <span class="block px-3 py-2 text-gray-700 font-medium">
          Hi, {{ props.username }}
        </span>

        <button
          @click="logout"
          class="block px-3 py-2 text-gray-500 hover:text-red-600 w-full text-left"
        >
          Logout
        </button>
      </div>

      <!-- Not Logged In -->
      <div v-else>
        <router-link
          to="/login"
          class="block px-3 py-2 text-gray-700 hover:text-green-700 font-medium"
        >
          Masuk
        </router-link>

        <router-link
          to="/register"
          class="block px-3 py-2 text-gray-700 hover:text-green-700 font-medium"
        >
          Daftar
        </router-link>
      </div>
    </div>
  </nav>
</template>
