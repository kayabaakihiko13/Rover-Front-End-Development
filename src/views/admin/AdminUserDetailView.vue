<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { adminApiService } from "@/services/api";

const route = useRoute();
const router = useRouter();

const user = ref(null);
const loading = ref(true);
const error = ref("");
const successMessage = ref("");

const fetchUser = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await adminApiService.getUserDetail(route.params.user_id);
    user.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.detail || "Pengguna tidak ditemukan";
  } finally {
    loading.value = false;
  }
};

const handleBanUser = async () => {
  if (!confirm("Apakah Anda yakin ingin memblokir pengguna ini?")) return;

  try {
    await adminApiService.deleteUser(route.params.user_id);
    successMessage.value = "Pengguna berhasil diblokir";
    setTimeout(() => router.push("/admin/users"), 1500);
  } catch (err) {
    error.value = err.response?.data?.detail || "Gagal memblokir pengguna";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div>
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="router.push('/admin/users')"
        class="text-gray-600 hover:text-gray-900"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-2xl font-bold text-gray-800">Detail Pengguna</h1>
    </div>

    <div v-if="successMessage" class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
      {{ successMessage }}
    </div>

    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>

    <div v-else-if="user" class="bg-white rounded-xl shadow-sm p-6">
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-2xl font-bold text-green-700">
              {{ user.username?.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-800">{{ user.username }}</h2>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>
        </div>
        <span
          :class="[
            'px-3 py-1 text-sm rounded-full',
            user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          ]"
        >
          {{ user.is_active ? "Aktif" : "Diblokir" }}
        </span>
      </div>

      <div class="border-t pt-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Informasi Akun</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-500 mb-1">ID Pengguna</p>
            <p class="font-medium text-gray-800">{{ user.user_id }}</p>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-500 mb-1">Tanggal Dibuat</p>
            <p class="font-medium text-gray-800">{{ formatDate(user.create_at) }}</p>
          </div>
          <div v-if="user.update_at" class="p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-500 mb-1">Terakhir Diperbarui</p>
            <p class="font-medium text-gray-800">{{ formatDate(user.update_at) }}</p>
          </div>
        </div>
      </div>

      <div v-if="user.is_active" class="mt-6 pt-6 border-t">
        <button
          @click="handleBanUser"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Blokir Pengguna
        </button>
      </div>
    </div>
  </div>
</template>
