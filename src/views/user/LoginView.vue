<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { authApi } from "@/services/api";
import { emitAuthChange } from "@/composables/useAuth";
import { STORAGE_KEYS, ROUTES } from "@/constants"; 

const router = useRouter();
const route = useRoute();

const form = ref({
  username: "",
  password: "",
});

const isSubmitting = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const response = await authApi.login(form.value.username, form.value.password);
    const data = response.data;

    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, data.access_token);
    localStorage.setItem(STORAGE_KEYS.USER_USERNAME, form.value.username);
    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, data.access_token);
    localStorage.setItem(STORAGE_KEYS.USER_USERNAME, form.value.username);

    emitAuthChange();

    if (route.query.expired === 'true') {
      alert("Session expired, silakan login kembali");
      router.replace(ROUTES.DASHBOARD);
    } else {
      const redirectPath = route.query.redirect || ROUTES.DASHBOARD;
      router.replace(redirectPath);
    }
    
  } catch (err) {
    errorMessage.value = err.response?.data?.detail || "Login gagal.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-sm border border-gray-100 dark:border-gray-700">

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Masuk
      </h2>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
        {{ errorMessage }}
      </div>

      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleLogin">

        <!-- Username -->
        <div>
          <input
            v-model="form.username"
            type="text"
            placeholder="Nama Pengguna"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Kata Sandi"
            class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 
                   bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            required
          />

          <div class="text-right mt-1">
            <RouterLink
              to="/forgot-password"
              class="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
              Lupa Sandi?
            </RouterLink>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition disabled:opacity-50"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Memproses..." : "Masuk" }}
        </button>
      </form>

      <!-- Register Link -->
      <p class="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
        Belum punya akun?
        <RouterLink 
          to="/register" 
          class="text-green-700 dark:text-green-400 font-medium hover:underline">
          Daftar disini
        </RouterLink>
      </p>
    </div>
  </div>
</template>