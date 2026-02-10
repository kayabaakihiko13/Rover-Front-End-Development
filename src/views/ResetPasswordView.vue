<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();
const router = useRouter();

const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref("");
const message = ref("");

const handleReset = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = "Kata sandi tidak cocok!";
    return;
  }

  loading.value = true;
  error.value = "";
  message.value = "";

  const token = route.query.token; // ambil token dari query string

  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/users/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        new_password: newPassword.value,
        confirm_password: confirmPassword.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      message.value = data.message;
      setTimeout(() => router.push("/login"), 1500);
    } else {
      error.value = data.detail || "Terjadi kesalahan";
    }
  } catch (err) {
    error.value = "Gagal terhubung ke server";
  } finally {
    loading.value = false;
  }
};
</script>
 
<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Reset Kata Sandi</h2>

      <form @submit.prevent="handleReset" class="space-y-4">
        <input v-model="newPassword" type="password" placeholder="Kata Sandi Baru"
               class="w-full border rounded-lg px-4 py-2 focus-visible:ring-2 
        focus-visible:ring-green-500 
        focus:outline-none" />
        <input v-model="confirmPassword" type="password" placeholder="Konfirmasi Kata Sandi"
               class="w-full border rounded-lg px-4 py-2 focus-visible:ring-2 
        focus-visible:ring-green-500 
        focus:outline-none" />
        <button type="submit"
                class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition">
          Reset Kata Sandi
        </button>
      </form>

      <p v-if="message" class="text-green-600 mt-4 text-center">{{ message }}</p>
      <p v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>
