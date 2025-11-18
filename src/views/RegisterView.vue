<script setup>
import {ref} from 'vue'
// state form
const form = ref({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: ''
})
// submit
const handleRegister = ()=>{
    console.log("Data dikirim:", form.value)
    // nanti tinggal ganti api backend nya (fast-api)
}

</script>
<template>
<div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">

      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Daftar Akun
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <input 
            v-model="form.firstname"
            type="text"
            placeholder="Nama Depan"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 
                   focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <input 
            v-model="form.lastname"
            type="text"
            placeholder="Nama Belakang"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 
                   focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <input 
            v-model="form.username"
            type="text"
            placeholder="Username"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 
                   focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <input 
            v-model="form.email"
            type="email"
            placeholder="Email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 
                   focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <input 
            v-model="form.password"
            type="password"
            placeholder="Kata Sandi"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 
                   focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <button 
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition">
          Daftar
        </button>
      </form>

      <p class="text-sm text-center text-gray-600 mt-4">
        Sudah punya akun?
        <RouterLink 
          to="/login"
          class="text-green-700 font-medium hover:underline">
          Masuk disini
        </RouterLink>
      </p>

    </div>
  </div>


</template>