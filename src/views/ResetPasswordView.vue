<template>
  <div>
    <HeaderSection />

    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div class="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Reset Kata Sandi
        </h2>

        <form @submit.prevent="handleReset" class="space-y-4">
          <div>
            <input
              v-model="newPassword"
              type="password"
              placeholder="Kata Sandi Baru"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Konfirmasi Kata Sandi"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition"
          >
            Reset Kata Sandi
          </button>
        </form>

        <p class="text-sm text-center text-gray-600 mt-4">
          Kembali ke
          <RouterLink
            to="/login"
            class="text-green-700 font-medium hover:underline"
          >
            Masuk
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSection from "@/components/HeaderSection.vue";

export default {
  name: "ResetPasswordView",
  components: { HeaderSection },

  data() {
    return {
      newPassword: "",
      confirmPassword: "",
    };
  },

  methods: {
    async handleReset() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Kata sandi tidak cocok!");
        return;
      }

      const token = this.$route.params.token; // Ambil token dari URL

      try {
        const response = await fetch(`/auth/reset-password/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            new_password: this.newPassword,
            confirm_password: this.confirmPassword,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Kata sandi berhasil direset!");
          this.$router.push("/login");
        } else {
          alert(data.message || "Terjadi kesalahan");
        }
      } catch (error) {
        alert("Gagal terhubung ke server");
      }
    },
  },
};
</script>
