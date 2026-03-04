<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authApi } from "@/services/api";
import { emitAuthChange } from "@/composables/useAuth";

const router = useRouter();

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

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", form.value.username);

    emitAuthChange();

    router.push("/dashboard");
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

      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Masuk
      </h2>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
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
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Kata Sandi"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />

          <div class="text-right mt-1">
            <RouterLink
              to="/forgot-password"
              class="text-sm text-gray-500 hover:text-green-600">
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
      <p class="text-sm text-center text-gray-600 mt-4">
        Belum punya akun?
        <RouterLink 
          to="/register" 
          class="text-green-700 font-medium hover:underline">
          Daftar disini
        </RouterLink>
      </p>
    </div>
  </div>
</template>


