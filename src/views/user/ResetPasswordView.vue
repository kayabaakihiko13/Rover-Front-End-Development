<script setup>
import { ref,computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const route = useRoute();
const router = useRouter();

const form = {
  newpassword:"",
  confirmpassword:""
}

const loading = ref(false);
const error = ref("");
const message = ref("");

const passwordError = computed(()=>{
  if(newPassword.value.length <10){
    return "Password minimal 10 karakter";
  }
  return "";
});

const isFormValid = computed(()=>{
  return (
    !passwordError.value &&
    form.newpassword.value === form.confirmpassword.value &&
    form.newpassword.value.length > 0
  );
})

const handleReset = async () => {
  if (!isFormValid.value) {
    error.value = passwordError.value || "Kata sandi tidak cocok!";
    return;
  }

  loading.value = true;
  error.value = "";
  message.value = "";

  const token = route.query.token;

  try {
    const response = await fetch(
      `${API_BASE_URL.replace(/\/$/, "")}/users/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: form.newpassword.value,
          confirm_password: form.confirmpassword.value,
        }),
      }
    );

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
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Reset Kata Sandi
      </h2>

      <form @submit.prevent="handleReset" class="space-y-4">

        <input
          v-model="newPassword"
          type="password"
          placeholder="Kata Sandi Baru"
          :minlength="10"
          class="w-full border rounded-lg px-4 py-2
                 focus-visible:ring-2 focus-visible:ring-green-500
                 focus:outline-none"
        />

        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Konfirmasi Kata Sandi"
          :minlength="10"
          class="w-full border rounded-lg px-4 py-2
                 focus-visible:ring-2 focus-visible:ring-green-500
                 focus:outline-none"
        />

        <p v-if="passwordError" class="text-red-500 text-sm">
          {{ passwordError }}
        </p>

        <button
          type="submit"
          :disabled="!isFormValid || loading"
          class="w-full bg-green-700 hover:bg-green-800
                 disabled:bg-gray-400
                 text-white py-2 rounded-lg transition"
        >
          {{ loading ? "Memproses..." : "Reset Kata Sandi" }}
        </button>
      </form>

      <p v-if="message" class="text-green-600 mt-4 text-center">
        {{ message }}
      </p>

      <p v-if="error" class="text-red-600 mt-4 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>