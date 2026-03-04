<script setup>
import { ref,computed} from "vue";
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

  // Reset error setiap submit baru
  errorMessage.value = "";
  successMessage.value = "";
  fieldErrors.value.username = "";

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
  <div class="min-h-screen flex bg-gradient-to-br from-green-50 to-emerald-100">

    <!-- LEFT SIDE (Branding Section) -->
    <div class="hidden lg:flex w-1/2 bg-green-700 text-white p-12 flex-col justify-between">
      <div>
        <h1 class="text-4xl font-bold mb-4">
          AI Fruit Detection
        </h1>
        <p class="text-green-100 text-lg leading-relaxed">
          Sistem cerdas untuk mendeteksi tingkat kematangan buah
          secara otomatis menggunakan teknologi Artificial Intelligence.
        </p>
      </div>

      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            🤖
          </div>
          <p>Deteksi otomatis & akurat</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            📊
          </div>
          <p>Rekap & analisis hasil deteksi</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            ⚡
          </div>
          <p>Proses cepat & efisien</p>
        </div>
      </div>

      <p class="text-sm text-green-200">
        © 2026 AI Detection System
      </p>
    </div>

    <!-- RIGHT SIDE (Register Form) -->
    <div class="flex flex-1 items-center justify-center p-6">
      <div class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800">
            Buat Akun
          </h2>
          <p class="text-gray-500 text-sm mt-2">
            Daftar untuk mulai menggunakan sistem
          </p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">

          <!-- First & Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <input
              v-model="form.firstname"
              type="text"
              placeholder="Nama Depan"
              required
              class="input-modern"
            />

            <input
              v-model="form.lastname"
              type="text"
              placeholder="Nama Belakang"
              class="input-modern"
            />
          </div>

          <!-- Username -->
          <div>
            <input
              v-model="form.username"
              type="text"
              placeholder="Username"
              required
              class="input-modern"
            />
            <p v-if="fieldErrors.username" class="error-text">
              {{ fieldErrors.username }}
            </p>
          </div>

          <!-- Email -->
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            class="input-modern"
          />

          <!-- Password -->
          <div>
            <input
              v-model="form.password"
              type="password"
              placeholder="Password (min 10 karakter)"
              required
              class="input-modern"
            />
            <p v-if="passwordError" class="error-text">
              {{ passwordError }}
            </p>
          </div>

          <!-- Global Error -->
          <p v-if="errorMessage" class="error-text text-center">
            {{ errorMessage }}
          </p>

          <!-- Success -->
          <p v-if="successMessage" class="success-text text-center">
            {{ successMessage }}
          </p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition shadow-md disabled:opacity-60"
          >
            {{ loading ? "Memproses..." : "Daftar Sekarang" }}
          </button>

        </form>

        <!-- Login Link -->
        <p class="text-sm text-center text-gray-600 mt-6">
          Sudah punya akun?
          <RouterLink
            to="/login"
            class="text-green-700 font-semibold hover:underline"
          >
            Masuk
          </RouterLink>
        </p>

      </div>
    </div>
  </div>
</template>


<style scoped>
.input-modern {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.input-modern:focus {
  outline: none;
  border-color: #15803d;
  box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.2);
}

.error-text {
  color: #dc2626;
  font-size: 13px;
  margin-top: 6px;
}

.success-text {
  color: #16a34a;
  font-size: 13px;
  margin-top: 6px;
}
</style>