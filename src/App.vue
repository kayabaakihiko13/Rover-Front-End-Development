<script setup>
import Header from "./components/HeaderSection.vue";
import Footer from "./components/FooterSection.vue"
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">

    <!-- Global Header Section -->
    <Header />
    <!-- Mains Section -->
     <main class="flex-grow">
       
       <RouterView />
     </main>
    <!-- Footer Header Section -->
  </div>

</template>
