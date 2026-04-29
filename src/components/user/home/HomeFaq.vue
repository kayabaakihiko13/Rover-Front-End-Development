<script setup>
import { ref } from "vue";
import { ChevronUp, ChevronDown } from "lucide-vue-next";

const faqs = [
  { q: "Bagaimana cara kerja deteksi AI?", a: "Sistem AI kami menggunakan teknologi computer vision yang telah dilatih dengan ribuan gambar buah sawit pada berbagai tingkat kematangan. Ketika Anda mengunggah foto, AI akan menganalisis warna, tekstur, dan karakteristik visual lainnya untuk menentukan tingkat kematangan dengan akurasi 98%." },
  { q: "Apakah aplikasi ini gratis?", a: "Kami menyediakan paket gratis dengan kuota deteksi terbatas per bulan. Untuk penggunaan yang lebih intensif, tersedia paket premium dengan fitur tambahan seperti analisis historis, rekomendasi panen otomatis, dan prioritas dukungan pelanggan." },
  { q: "Apakah bisa digunakan offline?", a: "Saat ini aplikasi membutuhkan koneksi internet untuk proses analisis AI. Namun, Anda dapat mengambil foto secara offline dan sistem akan otomatis mengunggah untuk dianalisis ketika koneksi tersedia. Kami sedang mengembangkan mode offline untuk versi mendatang." },
  { q: "Smartphone apa yang kompatibel?", a: "PalmDetector kompatibel dengan hampir semua smartphone Android (versi 8.0 ke atas) dan iOS (versi 13 ke atas). Aplikasi ini dioptimalkan untuk bekerja dengan baik bahkan pada perangkat dengan spesifikasi menengah." },
  { q: "Bagaimana cara mendapatkan dukungan teknis?", a: "Tim support kami siap membantu Anda melalui WhatsApp, email, atau live chat dalam aplikasi. Untuk pengguna premium, tersedia hotline 24/7 dan dedicated account manager." }
];

const openFaq = ref(null);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index;
}
</script>

<template>
  <section id="faq" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pertanyaan yang Sering Diajukan</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Temukan jawaban untuk pertanyaan Anda</p>
      </div>
      <div class="space-y-4">
        <div v-for="(item, index) in faqs" :key="index" class="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-5 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span class="font-semibold text-gray-900 dark:text-white text-lg">{{ item.q }}</span>
            <ChevronUp v-if="openFaq === index" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <ChevronDown v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div v-if="openFaq === index" class="px-6 py-5 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>