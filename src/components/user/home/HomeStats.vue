<script setup>
import { Users, Camera, Award, TrendingUp } from "lucide-vue-next";
</script>

<template>
  <section class="py-20 bg-green-600 text-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4">Dipercaya oleh Ribuan Petani</h2>
        <p class="text-xl text-green-100">Data dan pencapaian kami</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <Users class="w-12 h-12 mx-auto mb-4" />
          <div class="text-4xl font-bold mb-2">5,000+</div>
          <div class="text-green-100">Petani Aktif</div>
        </div>
        <div class="text-center">
          <Camera class="w-12 h-12 mx-auto mb-4" />
          <div class="text-4xl font-bold mb-2">50K+</div>
          <div class="text-green-100">Deteksi Per Hari</div>
        </div>
        <div class="text-center">
          <Award class="w-12 h-12 mx-auto mb-4" />
          <div class="text-4xl font-bold mb-2">98%</div>
          <div class="text-green-100">Akurasi AI</div>
        </div>
        <div class="text-center">
          <TrendingUp class="w-12 h-12 mx-auto mb-4" />
          <div class="text-4xl font-bold mb-2">35%</div>
          <div class="text-green-100">Peningkatan Hasil</div>
        </div>
      </div>
    </div>
  </section>
</template>