<script setup>
import { Upload, Eye, Download } from "lucide-vue-next";
</script>

<template>
  <section id="how-it-works" class="py-20 bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Cara Kerja</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Tiga langkah mudah untuk deteksi kematangan buah sawit</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div class="process-card group">
          <div class="card-number">1</div>
          <Upload class="card-icon" />
          <h3 class="card-title">Ambil Foto</h3>
          <p class="card-description">
            Upload foto buah sawit dari kebun Anda menggunakan kamera smartphone
          </p>
        </div>

        <div class="process-card group">
          <div class="card-number">2</div>
          <Eye class="card-icon" />
          <h3 class="card-title">Analisis AI</h3>
          <p class="card-description">
            Sistem AI menganalisis foto dan menentukan tingkat kematangan buah secara otomatis
          </p>
        </div>

        <div class="process-card group">
          <div class="card-number">3</div>
          <Download class="card-icon" />
          <h3 class="card-title">Dapatkan Hasil</h3>
          <p class="card-description">
            Terima hasil deteksi lengkap dengan rekomendasi waktu panen yang optimal
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#how-it-works .grid {
  padding: 1rem 0;
}

.process-card {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 0 40px rgba(16, 185, 129, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dark .process-card {
  background: rgba(17, 24, 39, 0.9);
  border-color: rgba(16, 185, 129, 0.3);
}

.process-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset,
    0 0 70px rgba(16, 185, 129, 0.25);
  border-color: rgba(16, 185, 129, 0.5);
}

.card-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.75rem;
  font-weight: bold;
  color: white;
  box-shadow: 
    0 6px 20px rgba(16, 185, 129, 0.4),
    0 0 0 4px rgba(16, 185, 129, 0.2);
  transition: transform 0.3s ease;
}

.process-card:hover .card-number {
  transform: scale(1.1);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1.5rem;
  color: #10b981;
  filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.5));
  transition: filter 0.3s ease;
}

.process-card:hover .card-icon {
  filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.8));
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.card-description {
  color: #94a3b8;
  line-height: 1.7;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .process-card {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>