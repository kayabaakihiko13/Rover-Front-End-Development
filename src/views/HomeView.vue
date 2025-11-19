<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-green-50 w-full py-16">
      <div class="max-w-6xl mx-auto px-6 text-center">

        <h1 class="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Selamat Datang di PalmDetector
        </h1>

        <p class="text-gray-600 mb-8 text-base md:text-lg">
          Deteksi kematangan buah sawit secara cepat dan akurat langsung dari ponselmu.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">

          <!-- FIX RouterLink casing -->
          <router-link
            to="/login"
            class="bg-green-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Masuk
          </router-link>

          <router-link
            to="/register"
            class="bg-white border border-green-700 text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition"
          >
            Daftar
          </router-link>

        </div>
      </div>
    </section>

    <!-- Fitur Section -->
    <section class="max-w-6xl mx-auto px-6 py-12">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
        Kenali PalmDetector
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

        <div class="bg-white rounded-xl shadow-md p-6 text-center">
          <i class="fa-solid fa-leaf text-green-600 text-3xl mb-4"></i>
          <h3 class="font-semibold text-lg mb-2">Deteksi Cepat</h3>
          <p class="text-gray-600 text-sm md:text-base">
            Hanya dengan foto buah, aplikasi bisa menilai kematangan secara otomatis.
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 text-center">
          <i class="fa-solid fa-dollar-sign text-green-600 text-3xl mb-4"></i>
          <h3 class="font-semibold text-lg mb-2">Harga Sawit</h3>
          <p class="text-gray-600 text-sm md:text-base">
            Memberikan informasi harga sawit terkini untuk membantu perencanaan panen.
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 text-center">
          <i class="fa-solid fa-mobile-screen-button text-green-600 text-3xl mb-4"></i>
          <h3 class="font-semibold text-lg mb-2">Mudah Digunakan</h3>
          <p class="text-gray-600 text-sm md:text-base">
            Desain antarmuka sederhana, cocok untuk petani maupun operator lapangan.
          </p>
        </div>

      </div>
    </section>
  </div>
</template>
