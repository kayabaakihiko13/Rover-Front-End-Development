<script setup>
import cameraIcon from '@/assets/icons/camera.jpg'
import historyIcon from '@/assets/icons/histroy.jpg'
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Selamat Datang di Dashboard
      </h2>
      <p class="text-gray-600 text-lg">
        Pilih fitur untuk memulai aktivitas Anda
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- Card 1 - Deteksi (Green) -->
      <div
        class="group relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 
               text-white shadow-lg overflow-hidden
               transition-all duration-500 ease-out
               hover:shadow-2xl hover:-translate-y-2"
      >
        <!-- Background Pattern -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        
        <!-- Content dengan Flexbox -->
        <div class="relative z-10 flex flex-col h-full">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center p-2">
              <img :src="cameraIcon" alt="camera" class="w-full h-full object-contain" />
            </div>
            <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span class="text-sm font-semibold">Fitur Utama</span>
            </div>
          </div>

          <h3 class="text-3xl font-bold mb-3">
            Deteksi Kematangan
          </h3>

          <p class="text-green-50 mb-6 leading-relaxed flex-grow">
            Upload foto buah sawit dan dapatkan analisis kematangan instan dengan teknologi AI yang akurat.
          </p>

          <div class="flex items-center gap-2 mb-6 text-green-50">
          </div>

          <RouterLink
            to="/detection"
            class="flex items-center justify-center gap-2 w-full bg-white text-green-600 
                   font-bold py-4 px-6 rounded-xl
                   transition-all duration-300
                   hover:bg-green-50 hover:shadow-lg
                   active:scale-95 mt-auto"
          >
            <span>Mulai Deteksi</span>
          </RouterLink>
        </div>
      </div>

      <!-- Card 2 - Histori (Teal/Cyan) -->
      <div
        class="group relative bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 
               text-white shadow-lg overflow-hidden
               transition-all duration-500 ease-out
               hover:shadow-2xl hover:-translate-y-2"
      >
        <!-- Background Pattern -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
        
        <!-- Content dengan Flexbox -->
        <div class="relative z-10 flex flex-col h-full">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center p-2">
              <img :src="historyIcon" alt="history" class="w-full h-full object-contain" />
            </div>
            <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span class="text-sm font-semibold">Riwayat</span>
            </div>
          </div>

          <h3 class="text-3xl font-bold mb-3">
            Histori Deteksi
          </h3>

          <p class="text-teal-50 mb-6 leading-relaxed flex-grow">
            Lihat semua riwayat scan dan pantau perkembangan produktivitas kebun Anda dari waktu ke waktu.
          </p>

          <div class="flex items-center gap-2 mb-6 text-teal-50">
            <span class="text-sm font-medium">📅 Update Real-time</span>
          </div>

          <RouterLink
            to="/history"
            class="flex items-center justify-center gap-2 w-full bg-white text-teal-600 
                   font-bold py-4 px-6 rounded-xl
                   transition-all duration-300
                   hover:bg-teal-50 hover:shadow-lg
                   active:scale-95 mt-auto"
          >
            <span>Lihat Histori</span>
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.group {
  will-change: transform, box-shadow;
}
</style>