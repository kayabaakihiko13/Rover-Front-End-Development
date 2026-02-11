<script setup>
import cameraIcon from '@/assets/icons/camera.jpg'
import historyIcon from '@/assets/icons/histroy.jpg'
</script>


<template>
  <div class="max-w-5xl mx-auto px-6 py-12">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

      <!-- Card 1 -->
      <div
        class="bg-white rounded-2xl p-10 text-center shadow-md
               transition-all duration-500
               hover:-translate-y-2 hover:shadow-xl"
      >
        <h3 class="text-xl font-semibold mb-4">
          Deteksi
        </h3>

        <p class="text-gray-500 mb-6">
          Scan foto untuk rekomendasi panen
        </p>

        <img
          :src="cameraIcon"
          alt="camera"
          class="w-24 h-24 mx-auto mb-6 object-contain"
        />

        <RouterLink
          to="/detection"
          class="inline-block bg-green-600 hover:bg-green-700
                 text-white font-semibold py-3 px-6
                 rounded-xl transition-all duration-300"
        >
          Mulai Deteksi
        </RouterLink>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-white rounded-2xl p-10 text-center shadow-md
               transition-all duration-500
               hover:-translate-y-2 hover:shadow-xl"
      >
        <h3 class="text-xl font-semibold mb-4">
          Histori
        </h3>

        <p class="text-gray-500 mb-6">
          Catatan scan
        </p>

        <img
          :src="historyIcon"
          alt="history"
          class="w-24 h-24 mx-auto mb-6 object-contain"
        />

        <RouterLink
          to="/history"
          class="inline-block bg-green-600 hover:bg-green-700
                 text-white font-semibold py-3 px-6
                 rounded-xl transition-all duration-300"
        >
          Lihat
        </RouterLink>
      </div>

    </div>

  </div>
</template>
