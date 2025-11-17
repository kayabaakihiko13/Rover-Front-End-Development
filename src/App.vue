<script setup>
import Header from "./components/HeaderSection.vue";
// import Footer from "./components/FooterSection.vue"
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
    <footer class="py-6 text-center text-gray-500 text-sm border-t">
      Hak Cipta © 2025 <span class="font-semibold text-green-700">PalmDetector</span>
    </footer>
  </div>

</template>
