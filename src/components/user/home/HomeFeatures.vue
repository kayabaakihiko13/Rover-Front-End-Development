<script setup>
import { Camera, DollarSign, Smartphone } from "lucide-vue-next";
</script>

<template>
  <section id="features" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Fitur Unggulan</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Teknologi canggih untuk mendukung produktivitas Anda</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera class="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Deteksi Cepat</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Cukup ambil foto buah sawit, AI kami akan menganalisis tingkat kematangan dalam hitungan detik dengan akurasi tinggi.
            </p>
          </div>
        </div>

        <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign class="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Info Harga Terkini</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Dapatkan informasi harga sawit real-time dari berbagai daerah untuk membantu Anda merencanakan panen yang menguntungkan.
            </p>
          </div>
        </div>

        <div class="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative z-10">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone class="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Mudah Digunakan</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Interface sederhana dan intuitif, dirancang khusus untuk petani dan pekerja lapangan tanpa perlu pelatihan khusus.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>