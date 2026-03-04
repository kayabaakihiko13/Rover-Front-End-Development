<script setup>
import { ref, onMounted, computed } from "vue";
import { adminApiService } from "@/services/api";

const analytics = ref(null);
const loading = ref(true);
const error = ref("");
const selectedDays = ref(30);

const fetchAnalytics = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await adminApiService.getAnalytics(selectedDays.value);
    console.log("Analytics Response:", response.data);
    analytics.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.detail || "Gagal memuat data";
  } finally {
    loading.value = false;
  }
};

const categories = computed(() => {
  return analytics.value?.categories || [];
});

const totalEarnings = computed(() => {
  return analytics.value?.total_earnings || 0;
});

const userEarnings = computed(() => {
  return analytics.value?.user_earnings || [];
});

const maxCount = computed(() => {
  if (!analytics.value) return 0;
  const userCounts = analytics.value.user_growth?.map(d => d.count) || [];
  const categoryCounts = categories.value.map(c => c.count) || [];
  const allCounts = [...userCounts, ...categoryCounts];
  return Math.max(...allCounts, 1);
});

const getBarHeight = (count) => {
  return `${(count / maxCount.value) * 100}%`;
};

onMounted(() => {
  fetchAnalytics();
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Analitik</h1>
      <select
        v-model="selectedDays"
        @change="fetchAnalytics"
        class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
      >
        <option :value="7">7 Hari</option>
        <option :value="30">30 Hari</option>
        <option :value="90">90 Hari</option>
      </select>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg">
      {{ error }}
    </div>

    <div v-else>
      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- User Growth -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Pertumbuhan Pengguna</h3>
          <div class="h-48 flex items-end gap-1">
            <div
              v-for="(item, index) in analytics?.user_growth.slice(-14)"
              :key="index"
              class="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition"
              :style="{ height: getBarHeight(item.count) }"
              :title="`${item.date}: ${item.count} pengguna`"
            ></div>
          </div>
          <p class="text-sm text-gray-500 mt-2">Total: {{ analytics?.user_growth.reduce((sum, d) => sum + d.count, 0) }}</p>
        </div>

        <!-- Total Earnings -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Total Penghasilan</h3>
          <div class="text-4xl font-bold text-green-600 mt-8 mb-2">Rp {{ totalEarnings.toLocaleString('id-ID') }}</div>
          <p class="text-sm text-gray-500">Total semua kategori</p>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Kategori Buah</h3>
          <div class="space-y-4 mt-4">
            <div v-for="(cat, idx) in categories" :key="cat.name">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">{{ cat.name }}</span>
                <span class="font-medium">{{ cat.count }} buah (Rp {{ cat.total.toLocaleString('id-ID') }})</span>
              </div>
              <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full"
                  :class="['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-orange-500', 'bg-purple-500', 'bg-blue-500'][idx % 6]"
                  :style="{ width: `${(cat.count / (categories.reduce((s, c) => s + c.count, 1))) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Data Pengguna</h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div
              v-for="item in analytics?.user_growth"
              :key="item.date"
              class="flex justify-between text-sm py-2 border-b"
            >
              <span class="text-gray-600">{{ item.date }}</span>
              <span class="font-medium">{{ item.count }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Penghasilan per Pengguna</h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div
              v-for="item in userEarnings"
              :key="item.user_id"
              class="flex justify-between text-sm py-2 border-b"
            >
              <span class="text-gray-600">{{ item.username }}</span>
              <span class="font-medium text-green-600">Rp {{ item.total_earnings.toLocaleString('id-ID') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
