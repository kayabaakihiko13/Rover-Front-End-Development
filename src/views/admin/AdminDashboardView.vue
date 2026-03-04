<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { adminApiService } from "@/services/api";

const stats = ref(null);
const loading = ref(true);
const error = ref("");

const statCards = [
  { label: "Total Pengguna", key: "total_users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", color: "blue" },
  { label: "Total Postingan", key: "total_posts", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", color: "green" },
  { label: "Total Panen", key: "total_harvests", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4", color: "purple" },
  { label: "Pengguna Aktif", key: "active_users", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
  { label: "Pengguna Diblokir", key: "banned_users", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "red" },
];

const getColorClass = (color) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    emerald: "bg-emerald-100 text-emerald-600",
    red: "bg-red-100 text-red-600",
  };
  return colors[color] || colors.blue;
};

const fetchDashboard = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await adminApiService.getDashboard();
    stats.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.detail || "Gagal memuat data";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDashboard();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg">
      {{ error }}
    </div>

    <div v-else>
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          v-for="card in statCards"
          :key="card.key"
          class="bg-white rounded-xl shadow-sm p-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 mb-1">{{ card.label }}</p>
              <p class="text-3xl font-bold text-gray-800">
                {{ stats?.[card.key] || 0 }}
              </p>
            </div>
            <div :class="['p-3 rounded-full', getColorClass(card.color)]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="card.icon" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
        <div class="flex flex-wrap gap-4">
          <RouterLink
            to="/admin/users"
            class="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
          >
            Lihat Pengguna
          </RouterLink>
          <RouterLink
            to="/admin/analytics"
            class="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
          >
            Lihat Analitik
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
