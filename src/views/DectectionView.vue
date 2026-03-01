<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { postsApi, getImageUrl } from "@/services/api";
import { useDetectionResult } from "@/composables/useDetectionResult";

const router = useRouter();
const { setResult } = useDetectionResult();
const file = ref(null);
const previewUrl = ref(null);
const isSubmitting = ref(false);
const isDragging = ref(false);
const errorMessage = ref("");
const showCamera = ref(false);
const videoRef = ref(null);
const canvasRef = ref(null);
const stream = ref(null);

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  validateAndSetFile(selectedFile);
};

const validateAndSetFile = (selectedFile) => {
  errorMessage.value = "";
  
  if (!selectedFile) return;
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(selectedFile.type)) {
    errorMessage.value = "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.";
    return;
  }
  
  if (selectedFile.size > 10 * 1024 * 1024) {
    errorMessage.value = "Ukuran file terlalu besar. Maksimal 10MB.";
    return;
  }
  
  file.value = selectedFile;
  previewUrl.value = URL.createObjectURL(selectedFile);
  stopCamera();
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  const droppedFile = event.dataTransfer.files[0];
  validateAndSetFile(droppedFile);
};

const handleDragOver = (event) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const removeFile = () => {
  file.value = null;
  previewUrl.value = null;
  errorMessage.value = "";
};

// Camera Functions
const startCamera = async () => {
  try {
    showCamera.value = true;
    errorMessage.value = "";
    
    // Wait for DOM update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (videoRef.value) {
      stream.value = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }, 
        audio: false 
      });
      videoRef.value.srcObject = stream.value;
    }
  } catch (err) {
    console.error("Camera error:", err);
    errorMessage.value = "Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.";
    showCamera.value = false;
  }
};

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }
  showCamera.value = false;
};

const capturePhoto = () => {
  if (!videoRef.value || !canvasRef.value) return;
  
  const video = videoRef.value;
  const canvas = canvasRef.value;
  const context = canvas.getContext('2d');
  
  // Set canvas size to match video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Draw video frame to canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Convert to blob
  canvas.toBlob((blob) => {
    if (!blob) {
      errorMessage.value = "Gagal mengambil foto.";
      return;
    }
    
    // Create file from blob
    const file = new File([blob], `photo_${Date.now()}.jpg`, { 
      type: 'image/jpeg' 
    });
    
    validateAndSetFile(file);
  }, 'image/jpeg', 0.9);
};

const handleSubmit = async () => {
  if (!file.value) {
    errorMessage.value = "Silakan pilih gambar terlebih dahulu.";
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const response = await postsApi.upload(file.value);
    const data = response.data;

    const image_path = data.image_url;
    const imageUrl = getImageUrl(image_path);

    const predictData = data.result?.predict || {};
    
    const totalObjects = Object.values(predictData).reduce(
      (sum, count) => sum + (Number(count) || 0), 
      0
    );

    setResult({
      imageUrl,
      image_path,
      predict: predictData,
      classLabels: Object.keys(predictData),
      classCount: totalObjects,
    });

    router.push({ name: "result-detection" });
    
  } catch (err) {
    console.error(err);
    errorMessage.value = err.response?.data?.detail || "Kesalahan jaringan. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Deteksi Kematangan Buah Sawit</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Upload atau foto langsung buah sawit untuk analisis kematangan dengan AI YOLO
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
        <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 text-sm">{{ errorMessage }}</p>
      </div>

      <!-- Main Card -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div class="p-6 md:p-8">
          
          <!-- Camera View -->
          <div v-if="showCamera" class="mb-6">
            <div class="relative rounded-2xl overflow-hidden bg-black">
              <video 
                ref="videoRef" 
                autoplay 
                playsinline
                class="w-full h-auto max-h-96 object-cover"
              ></video>
              <canvas ref="canvasRef" class="hidden"></canvas>
              
              <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <button
                  @click="stopCamera"
                  class="px-6 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-600 transition"
                >
                  Batal
                </button>
                <button
                  @click="capturePhoto"
                  class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <div class="w-12 h-12 border-4 border-gray-800 rounded-full"></div>
                </button>
              </div>
            </div>
            <p class="text-center text-gray-500 text-sm mt-3">
              Posisikan buah sawit dalam frame dan tekan tombol untuk foto
            </p>
          </div>

          <!-- Preview Area -->
          <div v-else-if="previewUrl" class="mb-6">
            <div class="relative rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
              <img :src="previewUrl" alt="Preview" class="w-full h-64 md:h-80 object-contain" />
              
              <button
                @click="removeFile"
                class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              <div class="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {{ file?.name }}
              </div>
            </div>

            <div class="flex gap-3 mt-4">
              <button
                @click="removeFile"
                class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Ambil Foto Baru
              </button>
              <button
                @click="handleSubmit"
                :disabled="isSubmitting"
                class="flex-[2] px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                {{ isSubmitting ? 'Memproses...' : 'Deteksi Sekarang' }}
              </button>
            </div>
          </div>

          <!-- Upload Options -->
          <div v-else class="space-y-4">
            <!-- Drag & Drop Area -->
            <div 
              class="relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300"
              :class="isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
            >
              <input
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div class="space-y-3">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
                
                <div>
                  <p class="text-base font-semibold text-gray-700 mb-1">
                    {{ isDragging ? 'Lepaskan file di sini' : 'Drag & drop gambar' }}
                  </p>
                  <p class="text-gray-500 text-sm">atau klik untuk memilih file</p>
                </div>
                
                <div class="flex items-center justify-center gap-4 text-xs text-gray-400">
                  <span>JPG, PNG, WebP</span>
                  <span>•</span>
                  <span>Maks. 10MB</span>
                </div>
              </div>
            </div>

            <!-- OR Divider -->
            <div class="relative flex items-center justify-center">
              <div class="border-t border-gray-300 w-full"></div>
              <span class="bg-white px-4 text-gray-500 text-sm">atau</span>
              <div class="border-t border-gray-300 w-full"></div>
            </div>

            <!-- Camera Button - Mobile Friendly -->
            <button
              @click="startCamera"
              class="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-3"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Foto Langsung dengan Kamera</span>
            </button>

            <!-- Hidden file input for camera (fallback) -->
            <input
              type="file"
              accept="image/*"
              capture="environment"
              @change="handleFileChange"
              class="hidden"
              id="camera-input"
            />
          </div>

        </div>
      </div>

      <!-- Features -->
      <div class="mt-8 grid md:grid-cols-2 gap-4">
        <div class="flex items-start gap-3 bg-white/50 backdrop-blur p-4 rounded-xl">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 text-sm">Cepat & Akurat</h3>
            <p class="text-gray-500 text-xs mt-1">Deteksi dalam hitungan detik</p>
          </div>
        </div>
        
        <div class="flex items-start gap-2 bg-white/50 backdrop-blur p-4 rounded-xl">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 text-sm">Model YOLO</h3>
            <p class="text-gray-500 text-xs mt-1">AI terbaru untuk akurasi tinggi</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>