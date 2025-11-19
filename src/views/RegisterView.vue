<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
});

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleRegister = async () => {
  if (loading.value) return; // cegah double submit
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await fetch("http://127.0.0.1:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      errorMessage.value = data.detail ?? "Registrasi gagal.";
      return;
    }

    successMessage.value = "Registrasi berhasil! Mengarahkan ke login...";
    setTimeout(() => {
      router.push("/login");
    }, 1000);

  } catch (error) {
    errorMessage.value = "Gagal menghubungi server.";
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">

      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Daftar Akun
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">

        <input 
          v-model="form.firstname"
          type="text"
          placeholder="Nama Depan"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <input 
          v-model="form.lastname"
          type="text"
          placeholder="Nama Belakang"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <input 
          v-model="form.username"
          type="text"
          placeholder="Username"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <input 
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <input 
          v-model="form.password"
          type="password"
          placeholder="Kata Sandi"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <!-- ERROR -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </p>

        <!-- SUCCESS -->
        <p v-if="successMessage" class="text-green-600 text-sm text-center">
          {{ successMessage }}
        </p>

        <button 
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? "Memproses..." : "Daftar" }}
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
