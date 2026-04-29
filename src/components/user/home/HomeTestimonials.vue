<script setup>
const testimonials = [
  { name: "Budi Prasetyo", role: "Petani Sawit - Riau", initials: "BP", text: "Aplikasi ini sangat membantu! Sekarang saya bisa menentukan waktu panen yang tepat dan hasilnya meningkat 40%. Terima kasih PalmDetector!" },
  { name: "Siti Maryam", role: "Mandor Kebun - Jambi", initials: "SM", text: "Sebagai mandor kebun, aplikasi ini memudahkan pekerjaan kami. Deteksi cepat dan akurat, pekerja jadi lebih efisien." },
  { name: "Ahmad Hidayat", role: "Pengusaha Sawit - Sumatra Utara", initials: "AH", text: "Info harga sawit real-time sangat berguna untuk strategi penjualan. Keuntungan meningkat signifikan sejak pakai PalmDetector." }
];
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Testimoni Pengguna</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Apa kata petani tentang PalmDetector</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(item, index) in testimonials" :key="index" class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-1 mb-4">
            <span v-for="star in 5" :key="star" class="text-yellow-400 text-xl">★</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-6 italic">"{{ item.text }}"</p>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span class="text-green-700 dark:text-green-400 font-bold text-lg">{{ item.initials }}</span>
            </div>
            <div>
              <div class="font-bold text-gray-900 dark:text-white">{{ item.name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>