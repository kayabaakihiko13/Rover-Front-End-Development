# 🌴 PalmDetector — Deteksi Kematangan Buah Sawit

Aplikasi berbasis web untuk mendeteksi tingkat kematangan buah sawit menggunakan model **YOLOv11** dan teknologi modern:
- **Frontend**: Vue 3 + Vite + Tailwind CSS
- **Backend**: FastAPI + SQLAlchemy + JWT Auth
- **Computer Vision**: Ultralytics YOLO

---
# Teknologi Utama

- Vue 3 dengan `<script setup>` syntax
- Vite sebagai build tool (lebih cepat dari Webpack)
- Vue Router untuk navigasi SPA
- Tailwind CSS untuk styling utility-first
- ESLint + Prettier untuk kode yang konsisten

---
## Fitur

- ✅ Upload gambar buah sawit
- ✅ Deteksi otomatis menggunakan model YOLO
- ✅ Edit hasil deteksi (label & jumlah)
- ✅ Simpan hasil ke database
- ✅ Lihat histori deteksi dengan preview gambar
- ✅ Autentikasi pengguna (login/registrasi)

---

# 📁 Struktur Proyek (Frontend)
```bash
src/
├── views/           # Halaman utama (Detection, History, dll)
├── router/          # Konfigurasi Vue Router
├── components/      # Komponen reusable (opsional)
└── App.vue
```
## ▶️ Menjalankan Proyek

### Prasyarat
- [Node.js](https://nodejs.org/) ≥ v18
- Package manager: `npm`, `yarn`, atau `pnpm`

### Langkah Instalasi
```bash
# Clone repositori
git clone https://github.com/kayabaakihiko13/Rover-Front-End-Development.git

# Masuk ke folder proyek
cd Rover-Front-End-Development

# Instal dependensi
npm install
# atau
yarn install
# atau
pnpm install

# Jalankan development server
npm run dev
# atau
yarn dev
# atau
pnpm dev
```