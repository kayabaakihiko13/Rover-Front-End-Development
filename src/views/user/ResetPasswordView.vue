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
  <div class="min-h-screen flex justify-center items-center p-4 bg-gray-50 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-sm border border-gray-100 dark:border-gray-700">
      
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Reset Kata Sandi
      </h2>

      <form @submit.prevent="handleReset" class="space-y-4">

        <!-- New Password Input -->
        <input
          v-model="form.newpassword"
          type="password"
          placeholder="Kata Sandi Baru (min. 10 karakter)"
          :minlength="10"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 
                 bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-white 
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
        />

        <!-- Confirm Password Input -->
        <input
          v-model="form.confirmpassword"
          type="password"
          placeholder="Konfirmasi Kata Sandi"
          :minlength="10"
          class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 
                 bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-white 
                 placeholder-gray-400 dark:placeholder-gray-500
                 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
        />

        <!-- Password Error -->
        <p v-if="passwordError" class="text-red-600 dark:text-red-400 text-sm">
          {{ passwordError }}
        </p>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="!isFormValid || loading"
          class="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 dark:disabled:bg-gray-600
                 text-white py-2 rounded-lg transition disabled:cursor-not-allowed"
        >
          {{ loading ? "Memproses..." : "Reset Kata Sandi" }}
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
    </div>
  </div>
</template>