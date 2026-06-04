<script setup>
</script>

<template>
  <section class="pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-4xl mx-auto">
        <div class="inline-block mb-4 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
          <span class="text-green-700 dark:text-green-400 font-semibold text-sm">🌴 Solusi Cerdas untuk Petani Sawit</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Deteksi Kematangan Buah Sawit dengan <span class="text-green-600 dark:text-green-400">AI</span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Tingkatkan produktivitas kebun sawit Anda dengan teknologi deteksi kematangan buah berbasis AI. 
          Cepat, akurat, dan mudah digunakan langsung dari smartphone Anda.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <router-link 
            to="/register" 
            class="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Daftar Akun Sekarang →
          </router-link>
          <button 
            class="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-green-600 dark:border-green-500 text-green-700 dark:text-green-400 font-semibold rounded-xl hover:bg-green-50 dark:hover:bg-gray-700 transform hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Lihat Demo
          </button>
        </div>
        <div class="flex justify-center gap-12 text-center">
          <div>
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">98%</div>
            <div class="text-gray-600 dark:text-gray-300 text-sm">Akurasi Deteksi</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">5000+</div>
            <div class="text-gray-600 dark:text-gray-300 text-sm">Petani Aktif</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">50K+</div>
            <div class="text-gray-600 dark:text-gray-300 text-sm">Deteksi Harian</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>