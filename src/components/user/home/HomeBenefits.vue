<script setup>
import { CheckCircle2 } from "lucide-vue-next";

const benefits = [
  { title: "Meningkatkan Kualitas Panen", desc: "Deteksi yang akurat memastikan buah dipanen pada waktu yang tepat, menghasilkan kualitas TBS (Tandan Fruit Segar) yang lebih baik." },
  { title: "Menghemat Waktu & Tenaga", desc: "Tidak perlu lagi inspeksi manual yang memakan waktu. Satu foto sudah cukup untuk mendapat hasil analisis lengkap." },
  { title: "Maksimalkan Keuntungan", desc: "Dengan info harga real-time, Anda dapat menentukan strategi panen terbaik untuk mendapat harga jual tertinggi." },
  { title: "Dokumentasi Digital", desc: "Semua hasil deteksi tersimpan otomatis, memudahkan Anda melacak riwayat panen dan membuat analisis produktivitas." },
  { title: "Akses Kapan Saja", desc: "Aplikasi berbasis cloud memungkinkan Anda mengakses data dan melakukan deteksi dari mana saja, kapan saja." },
  { title: "Ramah Pemula", desc: "Interface yang sederhana dan panduan lengkap membuat siapa saja bisa menggunakan aplikasi ini dengan mudah." }
];
</script>

<template>
  <section id="benefits" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Manfaat untuk Anda</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Tingkatkan produktivitas dan keuntungan kebun sawit Anda</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(item, index) in benefits" :key="index" class="flex gap-4 items-start p-6 rounded-xl hover:bg-green-50 dark:hover:bg-gray-800 transition-colors">
          <div class="flex-shrink-0">
            <CheckCircle2 class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ item.title }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>