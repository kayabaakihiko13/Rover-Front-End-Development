<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { adminApiService } from "@/services/api";

const users = ref([]);
const loading = ref(true);
const error = ref("");
const successMessage = ref("");

const fetchUsers = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await adminApiService.getUsers();
    users.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.detail || "Gagal memuat data";
  } finally {
    loading.value = false;
  }
};

const handleBanUser = async (userId) => {
  if (!confirm("Apakah Anda yakin ingin memblokir pengguna ini?")) return;

  try {
    await adminApiService.deleteUser(userId);
    successMessage.value = "Pengguna berhasil diblokir";
    fetchUsers();
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (err) {
    error.value = err.response?.data?.detail || "Gagal memblokir pengguna";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Kelola Pengguna</h1>

    <div v-if="successMessage" class="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
      {{ successMessage }}
    </div>

    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>

    <div v-else-if="users.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center">
      <p class="text-gray-500">Belum ada pengguna</p>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dibuat</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(user, index) in users" :key="user.user_id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-600">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ user.username }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded-full',
                  user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                ]"
              >
                {{ user.is_active ? "Aktif" : "Diblokir" }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(user.create_at) }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <RouterLink
                  :to="`/admin/users/${user.user_id}`"
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Detail
                </RouterLink>
                <button
                  v-if="user.is_active"
                  @click="handleBanUser(user.user_id)"
                  class="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Blokir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
