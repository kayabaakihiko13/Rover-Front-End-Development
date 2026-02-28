<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sortable from "sortablejs";

const classOptions = [
  "mentah", "setangah_matang", "Matang",
  "terlalu_matang", "abnormal", "kosong",
];

const route = useRoute();
const router = useRouter();
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const imageUrl = computed(() =>
  route.query.imageUrl ? decodeURIComponent(route.query.imageUrl) : ""
);

const image_path = computed(() =>
  route.query.image_path ? decodeURIComponent(route.query.image_path) : ""
);

const formatLabel = (label) => {
  return label
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const predictData = computed(() => {
  if (route.query.predict) {
    try {
      const parsed = JSON.parse(decodeURIComponent(route.query.predict));
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch (e) {
      console.error("Gagal parse predict:", e);
    }
  }
  
  if (route.query.classLabels) {
    try {
      const labels = JSON.parse(decodeURIComponent(route.query.classLabels));
      if (Array.isArray(labels)) {
        const countMap = {};
        labels.forEach(lbl => {
          countMap[lbl] = (countMap[lbl] || 0) + 1;
        });
        return countMap;
      }
    } catch (e) {
      console.error("Gagal parse classLabels:", e);
    }
  }
  
  return {};
});

const classCount = computed(() => {
  return Object.values(predictData.value).reduce(
    (sum, count) => sum + (Number(count) || 0),
    0
  );
});

const rows = ref([]);
const semuaBenar = ref(false);
const isSaving = ref(false);
const errorMessage = ref("");
const showSuccess = ref(false);
const tableRef = ref(null);
const editingIndex = ref(-1);

function initializeRows() {
  const predict = predictData.value;
  
  if (!predict || Object.keys(predict).length === 0) {
    rows.value = [];
    return;
  }

  rows.value = Object.entries(predict).map(([label, count]) => ({
    label,
    count: Number(count) || 1,
  }));
}

onMounted(() => {
  initializeRows();

  if (tableRef.value) {
    new Sortable(tableRef.value, {
      animation: 150,
      handle: '.drag-handle',
      onEnd(evt) {
        const moved = rows.value.splice(evt.oldIndex, 1)[0];
        rows.value.splice(evt.newIndex, 0, moved);
      },
    });
  }
});

function addRow() {
  rows.value.push({
    label: classOptions[0],
    count: 1,
  });
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 100);
}

function removeRow(index) {
  if (rows.value.length > 1) {
    rows.value.splice(index, 1);
  } else {
    errorMessage.value = "Minimal harus ada 1 objek";
    setTimeout(() => errorMessage.value = "", 3000);
  }
}

function editRow(index) {
  editingIndex.value = index;
}

function cancelEdit() {
  editingIndex.value = -1;
}

const saveResult = async () => {
  if (!image_path.value) {
    errorMessage.value = "Image path tidak ditemukan.";
    return;
  }

  isSaving.value = true;
  errorMessage.value = "";

  try {
    const formData = new FormData();
    formData.append("image_path", image_path.value);
    formData.append("semua_benar", semuaBenar.value ? "true" : "false");

    rows.value.forEach((row, i) => {
      formData.append(`class_label_${i + 1}`, row.label);
      formData.append(`counter_${i + 1}`, String(row.count));
    });

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/posts/simpan-edit`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Error ${response.status}: ${errText}`);
    }

    showSuccess.value = true;
    setTimeout(() => {
      router.push("/detection");
    }, 2000);
  } catch (err) {
    console.error("Error saat menyimpan:", err);
    errorMessage.value = err.message || "Terjadi kesalahan saat menyimpan.";
  } finally {
    isSaving.value = false;
  }
};

const totalByCategory = computed(() => {
  const summary = {};
  rows.value.forEach(row => {
    if (!summary[row.label]) {
      summary[row.label] = 0;
    }
    summary[row.label] += row.count;
  });
  return summary;
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-6">
    <div class="max-w-5xl mx-auto space-y-6">
      
      <!-- Success Overlay -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl p-8 text-center max-w-sm w-full">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Berhasil!</h3>
          <p class="text-gray-600">Data sedang disimpan...</p>
        </div>
      </div>

      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold text-gray-800">Hasil Deteksi</h1>
        <p class="text-gray-600">Periksa dan edit hasil deteksi AI</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div class="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-green-600">{{ classCount }}</div>
          <div class="text-xs text-gray-500 mt-1">Total Objek</div>
        </div>
        <div class="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div class="text-3xl font-bold text-blue-600">{{ rows.length }}</div>
          <div class="text-xs text-gray-500 mt-1">Kategori</div>
        </div>
        <div class="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
          <div class="text-sm font-semibold text-gray-700 mb-2">Ringkasan</div>
          <div class="flex flex-wrap gap-1">
            <span v-for="(count, label) in totalByCategory" :key="label" 
                  class="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">
              {{ formatLabel(label) }}: {{ count }}
            </span>
          </div>
        </div>
      </div>

      <!-- Image Container -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div class="relative">
          <img
            :src="imageUrl"
            alt="Hasil Deteksi"
            class="w-full h-auto max-h-96 object-contain bg-gray-50"
          />
          <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-lg">
            📷 Gambar Hasil Deteksi
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3">
        <svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 text-sm flex-1">{{ errorMessage }}</p>
        <button @click="errorMessage = ''" class="text-red-500 hover:text-red-700">✕</button>
      </div>

      <!-- Detection Results Card -->
      <div class="bg-white rounded-3xl shadow-xl p-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Daftar Objek Terdeteksi</h2>
            <p class="text-sm text-gray-500 mt-1">Drag untuk mengurutkan, klik edit untuk mengubah</p>
          </div>
          <button
            @click="addRow"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition font-semibold shadow-lg shadow-blue-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Tambah Objek
          </button>
        </div>

        <!-- Objects List -->
        <div ref="tableRef" class="space-y-3">
          <div
            v-for="(row, i) in rows"
            :key="i"
            class="group bg-gray-50 rounded-2xl p-4 border-2 border-transparent hover:border-gray-200 transition-all"
            :class="editingIndex === i ? 'ring-2 ring-blue-500 border-blue-300' : ''"
          >
            <div class="flex items-center gap-3">
              
              <!-- Drag Handle -->
              <div class="drag-handle cursor-move text-gray-400 hover:text-gray-600 p-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                </svg>
              </div>

              <!-- Label & Count -->
              <div class="flex-1 min-w-0">
                <div v-if="editingIndex !== i" class="flex items-center gap-3">
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-gray-800 truncate">{{ formatLabel(row.label) }}</div>
                    <div class="text-sm text-gray-500">Jumlah: <span class="font-bold text-gray-700">{{ row.count }}</span></div>
                  </div>
                </div>

                <!-- Edit Mode -->
                <div v-else class="space-y-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Jenis Kematangan</label>
                    <select
                      v-model="row.label"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option v-for="opt in classOptions" :key="opt" :value="opt">
                        {{ formatLabel(opt) }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">Jumlah</label>
                    <input
                      type="number"
                      v-model.number="row.count"
                      min="1"
                      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2">
                <button
                  v-if="editingIndex !== i"
                  @click="editRow(i)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Edit"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button
                  v-else
                  @click="cancelEdit"
                  class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  title="Batal"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <button
                  @click="removeRow(i)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Hapus"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="rows.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📭</div>
          <p class="text-gray-500">Belum ada objek yang terdeteksi</p>
          <button @click="addRow" class="mt-4 text-blue-600 font-semibold hover:underline">
            Tambah objek pertama
          </button>
        </div>

        <!-- Options -->
        <div class="mt-6 pt-6 border-t border-gray-200 space-y-4">
          <label class="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
            <input
              v-model="semuaBenar"
              type="checkbox"
              class="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <div class="flex-1">
              <div class="font-medium text-gray-800">✓ Semua hasil deteksi sudah benar</div>
              <div class="text-sm text-gray-500 mt-1">Centang jika tidak perlu edit lagi</div>
            </div>
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 space-y-3">
          <button
            @click="saveResult"
            :disabled="isSaving"
            class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-xl active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            <svg v-if="isSaving" class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
            </svg>
            {{ isSaving ? 'Menyimpan...' : 'Simpan Hasil Deteksi' }}
          </button>
          
          <router-link
            to="/detection"
            class="block w-full text-center py-3 text-gray-600 font-medium hover:text-gray-800 transition"
          >
            ← Kembali ke Upload
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group {
  animation: slideIn 0.3s ease-out;
}

/* Smooth sorting animation */
.sortable-ghost {
  opacity: 0.4;
  background: #e5e7eb;
}

.sortable-drag {
  opacity: 0.8;
}

/* Prevent zoom on iOS */
@media screen and (max-width: 768px) {
  input, select, textarea {
    font-size: 16px;
  }
}

/* Better touch feedback */
* {
  -webkit-tap-highlight-color: transparent;
}

button {
  min-height: 44px;
}
</style>