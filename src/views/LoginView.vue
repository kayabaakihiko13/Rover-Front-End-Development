<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">

      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Masuk
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-4">

        <!-- Username -->
        <div>
          <input 
            v-model="form.username"
            type="text"
            placeholder="Nama Pengguna"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 
                   focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <input 
            v-model="form.password"
            type="password"
            placeholder="Kata Sandi"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 
                   focus:ring-2 focus:ring-green-500 focus:outline-none"
          />

          <div class="text-right mt-1">
            <RouterLink 
              to="/forgot-password"
              class="text-sm text-gray-500 hover:text-green-600">
              Lupa Sandi?
            </RouterLink>
          </div>
        </div>

        <!-- Submit -->
        <button 
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition">
          Masuk
        </button>
      </form>

      <!-- Register link -->
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
import {ref} from 'vue'
// state form
const form = ref({
    username:'',
    password:'',
})

// submit handler 
const handleLogin= () =>{
    console.log(`Login data: ${form.value}`)
}
</script>