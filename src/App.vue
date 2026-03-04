<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import UserHeader from "./components/user/UserHeader.vue";

const route = useRoute();

const showUserHeader = computed(() => {
  return !route.path.startsWith("/admin");
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