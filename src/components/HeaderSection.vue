<template>
  <header class="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

      <!-- Brand -->
      <div class="flex items-center gap-3">
        <img src="../assets/vue.svg" alt="logo" class="w-8 h-8" />
        <h1 class="text-lg font-semibold tracking-wide">
          Rover-Palm Detector
        </h1>
      </div>

      <!-- Menu Desktop -->
      <ul class="hidden md:flex items-center gap-6 text-sm font-medium">
        <li><a href="#" class="hover:text-yellow-400 transition">Home</a></li>
        <li><a href="#" class="hover:text-yellow-400 transition">About</a></li>
        <li><a href="#" class="hover:text-yellow-400 transition">Detector</a></li>
        <li><a href="#" class="hover:text-yellow-400 transition">Contact</a></li>
      </ul>

      <!-- Hamburger (Mobile) -->
      <button class="md:hidden" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="open"
         class="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 flex flex-col gap-3 text-sm">
      <a href="#" class="hover:text-yellow-400">Home</a>
      <a href="#" class="hover:text-yellow-400">About</a>
      <a href="#" class="hover:text-yellow-400">Detector</a>
      <a href="#" class="hover:text-yellow-400">Contact</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);
const toggleMenu = () => (open.value = !open.value);
</script>
