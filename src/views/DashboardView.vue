<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mx-auto justify-items-center"
    >
      <!-- Card 1: Deteksi -->
      <div
        class="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105 w-80"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Deteksi
        </h3>
        <p class="text-gray-500 mb-6">
          Scan foto untuk rekomendasi panen
        </p>

        <img
          src="../assets/icons/camera.jpg"
          alt="camera"
          class="w-24 h-24 mb-6"
        >

        <RouterLink
          to="/detection"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Mulai Deteksi
        </RouterLink>
      </div>

      <!-- Card 2: Harga Pasar -->
      <div
        class="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105 w-80"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Harga Pasar TBS
        </h3>
        <p class="text-gray-500 mb-6">
          Pantau harga tandan buah segar
        </p>

        <img
          src="#"
          alt="price"
          class="w-24 h-24 mb-6"
        >

        <RouterLink
          to="#"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Lihat Harga
        </RouterLink>
      </div>

      <!-- Card 3: Histori -->
      <div
        class="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center transition-transform hover:scale-105 w-80"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Histori
        </h3>
        <p class="text-gray-500 mb-6">
          Catatan scan
        </p>

        <img
          src="../assets/icons/histroy.jpg"
          alt="history"
          class="w-24 h-24 mb-6"
        >

        <RouterLink
          to="#"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Lihat
        </RouterLink>
      </div>
    </div>
  </div>
</template>
