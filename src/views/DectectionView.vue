<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { API_BASE_URL } from "../main";

const router = useRouter();
const file = ref(null);
const isSubmitting = ref(false);
const errorMessage = ref("");

const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

const handleSubmit = async () => {
  if (!file.value) {
    errorMessage.value = "Silakan pilih gambar terlebih dahulu.";
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    errorMessage.value = "Anda harus login terlebih dahulu.";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/posts/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.detail || "Deteksi gagal.";
      return;
    }

    const image_path = data.image_url;
    const cleanBase = API_BASE_URL.replace(/\/+$/, "");
    const cleanPath = image_path.replaceAll("\\", "/").replace(/^\/+/, "");
    const imageUrl = `${cleanBase}/${cleanPath}`;

    // ✅ FIX: Kirim FULL predict object, bukan cuma keys-nya
    const predictData = data.result?.predict || {};
    
    // Hitung TOTAL objek (bukan jumlah kelas unik)
    const totalObjects = Object.values(predictData).reduce(
      (sum, count) => sum + (Number(count) || 0), 
      0
    );

    router.push({
      name: "result-detection",
      query: {
        imageUrl: encodeURIComponent(imageUrl),
        image_path: encodeURIComponent(image_path),
        
        // ✅ KIRIM PREDICT DATA LENGKAP
        predict: encodeURIComponent(JSON.stringify(predictData)),
        
        // Fallback: tetap kirim classLabels untuk kompatibilitas
        classLabels: encodeURIComponent(JSON.stringify(Object.keys(predictData))),
        
        // ✅ TOTAL OBJEK YANG BENAR
        classCount: totalObjects,
      },
    });
    
  } catch (err) {
    console.error(err);
    errorMessage.value = "Kesalahan jaringan.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-3">Deteksi Kematangan Buah Sawit</h1>

      <p class="text-gray-500 text-sm mb-6">
        Unggah gambar untuk mendeteksi tingkat kematangan buah sawit menggunakan model YOLO.
      </p>

      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
        {{ errorMessage }}
      </div>

      <input
        type="file"
        accept="image/*"
        @change="handleFileChange"
        class="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-2 focus:ring-green-600 mb-4"
      />
      
      <button
        @click="handleSubmit"
        :disabled="isSubmitting"
        class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        {{ isSubmitting ? "Memproses..." : "Deteksi Sekarang" }}
      </button>
    </div>
  </div>
</template>