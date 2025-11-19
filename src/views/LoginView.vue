<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Masuk
      </h2>

      <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 text-red-700 rounded">
        {{ errorMessage }}
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <input
            v-model="form.username"
            type="text"
            placeholder="Nama Pengguna"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <input
            v-model="form.password"
            type="password"
            placeholder="Kata Sandi"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Memproses..." : "Masuk" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

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
    // FIX URL SLASH
    const url = `${API_BASE_URL.replace(/\/$/, "")}/users/login`;

    // FIX: OAuth2PasswordRequestForm butuh form-urlencoded
    const body = new URLSearchParams();
    body.append("username", form.value.username);
    body.append("password", form.value.password);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.detail || "Login gagal.";
      isSubmitting.value = false;
      return;
    }

    // Simpan token
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", form.value.username);
    router.push("/dashboard");
  } catch (err) {
    errorMessage.value = "Kesalahan jaringan.";
  }

  isSubmitting.value = false;
};
</script>
