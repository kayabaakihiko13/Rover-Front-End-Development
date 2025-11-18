<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Lupa Kata Sandi
      </h2>
      <form
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <div>
          <input
            v-model="email"
            type="emil"
            placeholder="Masukan Email Anda Yang terdaftar"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
        </div>
        <button
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition"
        >
          Kirim Tautan Reset
        </button>
      </form>
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

<script setup>
import { ref } from "vue";
const email = ref("");
const handleSubmit = () => {
  console.log(`Hallo`);
};
</script>
