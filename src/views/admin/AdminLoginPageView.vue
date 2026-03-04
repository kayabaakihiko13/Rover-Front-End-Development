<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { adminApiService } from "@/services/api";
import { useAdminAuth, emitAdminAuthChange } from "@/composables/useAdminAuth";
import { ROUTES, STORAGE_KEYS } from "@/constants";

const router = useRouter();
const { isAdminLoggedIn } = useAdminAuth();

const form = ref({
  username: "",
  password: "",
});

const isSubmitting = ref(false);
const errorMessage = ref("");

onMounted(() => {
  if (isAdminLoggedIn.value) {
    router.push(ROUTES.ADMIN_DASHBOARD);
  }
});

const handleLogin = async () => {
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const response = await adminApiService.login(form.value.username, form.value.password);
    const data = response.data;

    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.access_token);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERNAME, form.value.username);

    emitAdminAuthChange();
    router.push(ROUTES.ADMIN_DASHBOARD);
  } catch (err) {
    errorMessage.value = err.response?.data?.detail || "Login gagal.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex justify-center items-center p-4 bg-gray-50">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-green-800">Rover Admin</h1>
        <p class="text-sm text-gray-500 mt-1">Masuk ke panel admin</p>
      </div>

      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
        {{ errorMessage }}
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <input
            v-model="form.username"
            type="text"
            placeholder="Nama Pengguna"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Kata Sandi"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition disabled:opacity-50"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Memproses..." : "Masuk" }}
        </button>
      </form>

      <p class="text-sm text-center text-gray-600 mt-4">
        <RouterLink to="/login" class="text-green-700 font-medium hover:underline">
          Kembali ke login pengguna
        </RouterLink>
      </p>
    </div>
  </div>
</template>
