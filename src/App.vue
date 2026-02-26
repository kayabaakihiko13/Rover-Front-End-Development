<script setup>
import Header from "./components/HeaderSection.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Global Header Section -->
    <Header />
    
    <!-- Main Section -->
    <main class="flex-grow">
      <RouterView />
    </main>

  </div>
</template>