<script setup>
import { ref } from "vue";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const username = ref(""); // pakai username
const loading = ref(false);
const message = ref("");
const error = ref("");

const handleSubmit = async () => {
  loading.value = true;
  message.value = "";
  error.value = "";

  try {
    const url = `${API_BASE_URL.replace(/\/$/, "")}/users/forgot-password`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.value }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.detail || "Gagal mengirim tautan reset");

    message.value = data.message;
    console.log("Reset link:", data.reset_link);
  } catch (err) {
    error.value = err.message || "Terjadi kesalahan";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Lupa Kata Sandi</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="username" type="text" placeholder="Masukkan username" required
               class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" />
        <button type="submit"
                class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition">
          Kirim Tautan Reset
        </button>
      </form>

      <p v-if="message" class="text-green-600 mt-4 text-center">{{ message }}</p>
      <p v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</p>
      <p class="text-sm text-center text-gray-600 mt-4">
        Ingat kata sandi?
        <router-link
          to="/login"
          class="text-green-700 font-medium hover:underline"
        >
          Masuk disini
        </router-link>
      </p>
    </div>
    
  </div>
</template>
