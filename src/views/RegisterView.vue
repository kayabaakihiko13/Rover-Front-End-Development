<script setup>
import { ref,computed,watch} from "vue";
import { useRouter } from "vue-router";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
// mencegah password nya kurang dari 10 karakter
const passwordError = computed(() => {
  if (!form.value.password) return "";
  if (form.value.password.length < 10) {
    return "Password minimal 10 karakter";
  }
  return "";
});
// handle usernameDouble
const fieldErrors = ref({
  username: "",
});

fieldErrors.value.username = "";
errorMessage.value = "";

const handleRegister = async () => {
  if (loading.value) return;

  if (passwordError.value) {
    errorMessage.value = passwordError.value;
    return;
  }

  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const url = `${API_BASE_URL.replace(/\/$/, "")}/users/register`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if(response.status == 400 && data.detail?.toLowerCase().includes("username")){
        fieldErrors.value.username = data.detail;
        return;
      }
      errorMessage.value = data.detail ?? "Registrasi gagal.";
      return;
    }

    successMessage.value = "Registrasi berhasil! Mengarahkan ke login...";
    setTimeout(() => router.push("/login"), 1000);

  } catch {
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
          required
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
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 
                 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <input 
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
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

        <p v-if="passwordError" class="text-red-500 text-sm">
          {{ passwordError }}
        </p>

        <!-- ERROR -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </p>

        <!-- SUCCESS -->
        <p v-if="successMessage" class="text-green-600 text-sm text-center">
          {{ successMessage }}
        </p>
        <p v-if="fieldErrors.username" class="text-red-500 text-sm">
        {{ fieldErrors.username }}
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
