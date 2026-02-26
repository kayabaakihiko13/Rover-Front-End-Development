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

// ✅ FIX: Parsing predictData dengan prioritas yang benar
const predictData = computed(() => {
  // Prioritas 1: predict dari query (JSON string)
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
  
  // Fallback: hitung dari classLabels array (untuk kompatibilitas)
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

// ✅ FIX: classCount dari predictData, bukan dari query
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
const tableRef = ref(null);

// ✅ FIX: Initialize rows dari predictData
function initializeRows() {
  const predict = predictData.value;
  
  if (!predict || Object.keys(predict).length === 0) {
    rows.value = [];
    return;
  }

  // Map: { mentah: 5 } → [{ label: "mentah", count: 5 }]
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
}

function removeRow(index) {
  if (rows.value.length > 1) {
    rows.value.splice(index, 1);
  }
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

    const response = await fetch(`${API_BASE_URL}/posts/simpan-edit`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Error ${response.status}: ${errText}`);
    }

    router.push("/detection");
  } catch (err) {
    console.error("Error saat menyimpan:", err);
    errorMessage.value = err.message || "Terjadi kesalahan saat menyimpan.";
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 px-3 sm:px-4 py-4 sm:py-8">
    <div class="bg-white shadow-xl rounded-2xl p-3 sm:p-6 w-full max-w-5xl">

      <!-- Success Banner -->
      <div class="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-center">
        <h2 class="text-lg sm:text-2xl font-bold text-green-700 mb-2">
          ✅ Terima kasih telah upload!
        </h2>
        <p class="text-green-800 text-xs sm:text-base mb-3">
          Hasil deteksi siap diedit atau disimpan.
        </p>

        <router-link
          to="/detection"
          class="inline-flex items-center justify-center px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base font-medium w-full sm:w-auto"
        >
          🔄 Deteksi Gambar Lain
        </router-link>
      </div>

      <!-- Title -->
      <h1 class="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center px-2">
        Hasil Deteksi
      </h1>

      <!-- Image -->
      <div class="flex justify-center mb-4 sm:mb-6 px-1">
        <img
          :src="imageUrl"
          alt="Hasil Deteksi"
          class="w-full rounded-xl border shadow-md object-contain max-h-[250px] sm:max-h-[500px]"
        />
      </div>

      <form @submit.prevent="saveResult">

        <!-- Header Section - Mobile Optimized -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 px-1">
          <p class="text-sm sm:text-lg font-medium">
            Ditemukan 
            <span class="text-green-600 font-bold text-base sm:text-lg">{{ classCount }}</span> objek.
          </p>

          <button
            type="button"
            @click="addRow"
            class="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base font-medium w-full sm:w-auto active:scale-95 transform"
          >
            <span class="text-lg">➕</span>
            <span>Tambah Objek</span>
          </button>
        </div>

        <!-- Responsive Card Layout - Mobile Optimized -->
        <div class="space-y-3 sm:space-y-4">
          <div
            v-for="(row, i) in rows"
            :key="i"
            class="bg-gray-50 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200"
          >
            <div class="flex flex-col gap-3 sm:gap-4">
              
              <!-- Class Label - Full Width on Mobile -->
              <div class="w-full">
                <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Jenis Tingkat Kematangan
                </label>
                <select
                  v-model="row.label"
                  class="border border-gray-300 rounded-lg px-3 py-2.5 w-full bg-white text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option
                    v-for="opt in classOptions"
                    :key="opt"
                    :value="opt"
                  >
                    {{ formatLabel(opt) }}
                  </option>
                </select>
              </div>

              <!-- Counter - Full Width on Mobile -->
              <div class="w-full">
                <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  Jumlah
                </label>
                <input
                  type="number"
                  v-model.number="row.count"
                  min="1"
                  class="border border-gray-300 rounded-lg px-3 py-2.5 w-full text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <!-- Delete Button - Full Width on Mobile, Styled Better -->
              <div class="w-full pt-2">
                <button
                  type="button"
                  @click="removeRow(i)"
                  class="w-full bg-red-50 text-red-600 border border-red-200 font-semibold py-2.5 px-4 rounded-lg hover:bg-red-100 active:bg-red-200 transition text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <span>🗑️</span>
                  <span>Hapus</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Checkbox - Better Mobile Spacing -->
        <div class="flex items-start mt-5 sm:mt-6 mb-5 sm:mb-6 p-3 bg-gray-50 rounded-lg">
          <input
            id="semua_benar"
            v-model="semuaBenar"
            type="checkbox"
            class="h-5 w-5 mt-0.5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer flex-shrink-0"
          />
          <label for="semua_benar" class="ml-3 text-sm sm:text-base text-gray-700 cursor-pointer select-none">
            Semua hasil deteksi sudah benar
          </label>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base border border-red-200"
        >
          {{ errorMessage }}
        </div>

        <!-- Submit Button - Full Width, Larger Touch Target -->
        <button
          type="submit"
          :disabled="isSaving"
          class="w-full bg-green-600 text-white font-bold py-3.5 sm:py-4 rounded-xl hover:bg-green-700 active:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg shadow-lg shadow-green-200"
        >
          {{ isSaving ? "⏳ Menyimpan..." : "💾 Simpan Hasil" }}
        </button>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* Prevent zoom on iOS when tapping inputs - important for mobile */
@media screen and (max-width: 768px) {
  input, select, textarea {
    font-size: 16px;
  }
}

/* Smooth transitions and better touch feedback */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Ensure buttons have minimum touch target size */
button {
  min-height: 44px;
}
</style>