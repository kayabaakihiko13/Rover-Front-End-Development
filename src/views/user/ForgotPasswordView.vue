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
  <!-- Root: TANPA transition-colors untuk instant theme switch -->
  <div class="min-h-screen flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-sm border border-gray-100 dark:border-gray-700">
      
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Lupa Kata Sandi
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <!-- Input Username -->
        <input 
          v-model="username" 
          type="text" 
          placeholder="Masukkan username" 
          required
          class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 
                 bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-white 
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors" 
        />
        
        <!-- Submit Button -->
        <button 
          type="submit"
          :disabled="loading"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Mengirim...' : 'Kirim Tautan Reset' }}
        </button>
      </form>

      <!-- Success Message -->
      <p v-if="message" class="text-green-600 dark:text-green-400 mt-4 text-center text-sm font-medium">
        {{ message }}
      </p>
      
      <!-- Error Message -->
      <p v-if="error" class="text-red-600 dark:text-red-400 mt-4 text-center text-sm">
        {{ error }}
      </p>
      
      <!-- Back to Login Link -->
      <p class="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
        Ingat kata sandi?
        <router-link
          to="/login"
          class="text-green-700 dark:text-green-400 font-medium hover:underline"
        >
          Masuk disini
        </router-link>
      </p>
    </div>
  </div>
</template>
