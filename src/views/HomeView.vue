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

          <router-link
            to="/login"
            class="bg-green-700 text-white font-semibold px-6 py-3 rounded-xl
                   transition-all duration-300
                   hover:bg-green-800 hover:scale-105"
          >
            Masuk
          </router-link>

          <router-link
            to="/register"
            class="bg-white border border-green-700 text-green-700 font-semibold px-6 py-3 rounded-xl
                   transition-all duration-300
                   hover:bg-green-50 hover:scale-105"
          >
            Daftar
          </router-link>

        </div>
      </div>
    </section>

    <!-- Fitur Section -->
    <section class="max-w-6xl mx-auto px-6 py-16">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">
        Kenali PalmDetector
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        <!-- CARD TEMPLATE -->
        <div
          class="group relative bg-white rounded-2xl p-8 text-center
                 shadow-md
                 transition-all duration-700
                 ease-[cubic-bezier(0.22,1,0.36,1)]
                 hover:-translate-y-2 hover:shadow-2xl"
        >
          <!-- Glow -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r
                      from-green-100/0 via-green-100/40 to-green-100/0
                      opacity-0 blur-xl
                      transition duration-700
                      group-hover:opacity-100">
          </div>

          <div class="relative z-10">
            <i class="fa-solid fa-leaf text-green-600 text-3xl mb-4
                      transition-all duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-110"></i>

            <h3 class="font-semibold text-lg mb-2
                       transition-colors duration-300
                       group-hover:text-green-600">
              Deteksi Cepat
            </h3>

            <p class="text-gray-600 text-sm md:text-base">
              Hanya dengan foto buah, aplikasi bisa menilai kematangan secara otomatis.
            </p>
          </div>
        </div>

        <!-- CARD 2 -->
        <div
          class="group relative bg-white rounded-2xl p-8 text-center
                 shadow-md
                 transition-all duration-700
                 ease-[cubic-bezier(0.22,1,0.36,1)]
                 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r
                      from-green-100/0 via-green-100/40 to-green-100/0
                      opacity-0 blur-xl
                      transition duration-700
                      group-hover:opacity-100">
          </div>

          <div class="relative z-10">
            <i class="fa-solid fa-dollar-sign text-green-600 text-3xl mb-4
                      transition-all duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-110"></i>

            <h3 class="font-semibold text-lg mb-2
                       transition-colors duration-300
                       group-hover:text-green-600">
              Harga Sawit
            </h3>

            <p class="text-gray-600 text-sm md:text-base">
              Memberikan informasi harga sawit terkini untuk membantu perencanaan panen.
            </p>
          </div>
        </div>

        <!-- CARD 3 -->
        <div
          class="group relative bg-white rounded-2xl p-8 text-center
                 shadow-md
                 transition-all duration-700
                 ease-[cubic-bezier(0.22,1,0.36,1)]
                 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r
                      from-green-100/0 via-green-100/40 to-green-100/0
                      opacity-0 blur-xl
                      transition duration-700
                      group-hover:opacity-100">
          </div>

          <div class="relative z-10">
            <i class="fa-solid fa-mobile-screen-button text-green-600 text-3xl mb-4
                      transition-all duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:scale-110"></i>

            <h3 class="font-semibold text-lg mb-2
                       transition-colors duration-300
                       group-hover:text-green-600">
              Mudah Digunakan
            </h3>

            <p class="text-gray-600 text-sm md:text-base">
              Desain antarmuka sederhana, cocok untuk petani maupun operator lapangan.
            </p>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>
