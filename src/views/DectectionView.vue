<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const file = ref(null);
const resultImage = ref(null);
const predictData = ref({});
const confidenceData = ref({});
const bboxData = ref({});
const isSubmitting = ref(false);
const errorMessage = ref("");

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

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

    const response = await fetch(`${API_BASE_URL}/posts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.detail || "Deteksi gagal.";
      return;
    }

    const cleanBase = API_BASE_URL.replace(/\/+$/, "");
    const cleanPath = data.image_url.replaceAll("\\", "/").replace(/^\/+/, "");

    const finalImageUrl = `${cleanBase}/${cleanPath}`;

    // Simpan hasil prediksi
    const labels = Object.keys(data.result?.predict || {});
    const count = labels.length;

    router.push({
      name: "result-detection",
      query: {
        imageUrl: encodeURIComponent(finalImageUrl),
        classLabels: JSON.stringify(labels),  // ✅ ["Matang"]
        yamlLabels: JSON.stringify(Object.keys(data.result?.predict || {})),  // ✅ ["Matang"]
        classCount: count,
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
