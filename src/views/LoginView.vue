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

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { emitAuthChange } from "../utils/auth.js"; // <-- IMPORTANT

const router = useRouter();

const form = ref({
  username: "",
  password: "",
});

const isSubmitting = ref(false);
const errorMessage = ref("");

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const handleLogin = async () => {
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    // Hapus slash terakhir jika ada
    const url = `${API_BASE_URL.replace(/\/$/, "")}/users/login`;

    const body = new URLSearchParams();
    body.append("username", form.value.username);
    body.append("password", form.value.password);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.detail || "Login gagal.";
      isSubmitting.value = false;
      return;
    }

    // SAVE TOKEN + USER
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", form.value.username);

    // NOTIFY APP (Header.vue auto update)
    emitAuthChange();

    router.push("/dashboard");
  } catch (err) {
    errorMessage.value = "Kesalahan jaringan.";
  }

  isSubmitting.value = false;
};
</script>
