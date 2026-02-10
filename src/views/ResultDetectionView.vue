<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Sortable from "sortablejs";

const route = useRoute();
const router = useRouter();

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

// Parsing data dari query
const imageUrl = computed(() =>
  route.query.imageUrl ? decodeURIComponent(route.query.imageUrl) : ""
);

const image_path = computed(() => // ✅ tambahkan ini
  route.query.image_path ? decodeURIComponent(route.query.image_path) : ""
);

const classLabels = computed(() => {
  try {
    return JSON.parse(route.query.classLabels || "[]");
  } catch {
    return [];
  }
});

const yamlLabels = computed(() => {
  try {
    return JSON.parse(route.query.yamlLabels || "[]");
  } catch {
    return [];
  }
});

const classCount = computed(() => {
  const num = Number(route.query.classCount);
  return isNaN(num) ? classLabels.value.length : num;
});

// State tabel
const rows = ref([]);
const semuaBenar = ref(false);
const isSaving = ref(false);
const errorMessage = ref("");

// Inisialisasi rows
const countMap = {};
classLabels.value.forEach((lbl) => {
  countMap[lbl] = (countMap[lbl] || 0) + 1;
});
rows.value = Object.entries(countMap).map(([label, count]) => ({ label, count }));

function addRow() {
  rows.value.push({
    label: yamlLabels.value[0] || "",
    count: 1,
  });
}

function removeRow(index) {
  rows.value.splice(index, 1);
}

onMounted(() => {
  const table = document.getElementById("dnd-table");
  if (table) {
    new Sortable(table, {
      animation: 150,
      onEnd(evt) {
        const moved = rows.value.splice(evt.oldIndex, 1)[0];
        rows.value.splice(evt.newIndex, 0, moved);
      },
    });
  }
});

const saveResult = async () => {
  isSaving.value = true;
  errorMessage.value = "";

  try {
    const formData = new FormData();
    formData.append("image_path", image_path.value); // ✅ kirim path relatif
    formData.append("semua_benar", semuaBenar.value ? "true" : "false");

    rows.value.forEach((row, i) => {
      formData.append(`class_label_${i + 1}`, row.label);
      formData.append(`counter_${i + 1}`, row.count.toString());
    });

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    const response = await fetch(`${API_BASE_URL}/posts/simpan-edit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMsg = "Gagal menyimpan hasil.";
      try {
        const errData = await response.json();
        errorMsg = errData.detail || errorMsg;
      } catch {
        const text = await response.text();
        errorMsg = `Error ${response.status}: ${text.substring(0, 100)}`;
      }
      throw new Error(errorMsg);
    }

    router.push("/detection");
  } catch (err) {
    console.error("Error saat menyimpan:", err);
    errorMessage.value = err.message || "Terjadi kesalahan. Coba lagi.";
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
    <div class="bg-white shadow-xl rounded-2xl p-6 w-full max-w-5xl">
      <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
        <h2 class="text-2xl font-bold text-green-700">✅ Terima kasih telah upload!</h2>
        <p class="text-green-800">Hasil deteksi siap diedit atau disimpan.</p>
        <router-link
          to="/detection"
          class="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          🔄 Deteksi Gambar Lain
        </router-link>
      </div>

      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Hasil Deteksi</h1>

      <div class="flex justify-center mb-6">
        <img
          :src="imageUrl"
          alt="Hasil Deteksi"
          class="w-full max-w-4xl rounded-xl border shadow-md object-contain max-h-[500px]"
        />
      </div>

      <form @submit.prevent="saveResult">
        <input type="hidden" name="image_path" :value="image_path" />

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <p class="text-lg">
            Ditemukan <b class="text-green-600">{{ classCount }}</b> objek.
          </p>
          <button
            type="button"
            @click="addRow"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <span>➕</span> Tambah Objek
          </button>
        </div>

        <div class="overflow-x-auto rounded-lg shadow-sm">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-gray-700 font-semibold">Class Label</th>
                <th class="px-4 py-2 text-left text-gray-700 font-semibold">Counter</th>
                <th class="px-4 py-2 text-center text-gray-700 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody id="dnd-table" class="bg-white divide-y divide-gray-200">
              <tr v-for="(row, i) in rows" :key="i" class="hover:bg-gray-50 transition-colors">
                <td class="px-2 py-2">
                  <select
                    v-model="row.label"
                    :name="'class_label_' + (i + 1)"
                    class="border border-gray-300 rounded px-2 py-1 w-full text-sm bg-white"
                  >
                    <option v-for="opt in yamlLabels" :key="opt" :value="opt">
                      {{ opt }}
                    </option>
                  </select>
                </td>
                <td class="px-2 py-2">
                  <input
                    type="number"
                    v-model.number="row.count"
                    :name="'counter_' + (i + 1)"
                    min="1"
                    class="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                  />
                </td>
                <td class="px-2 py-2 text-center">
                  <button
                    type="button"
                    @click="removeRow(i)"
                    class="text-red-600 font-semibold hover:text-red-800 transition-colors"
                  >
                    ×
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center mt-4 mb-6">
          <input
            id="semua_benar"
            v-model="semuaBenar"
            type="checkbox"
            class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label for="semua_benar" class="ml-2 block text-sm text-gray-700">
            Semua hasil deteksi sudah benar
          </label>
        </div>

        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="isSaving"
          class="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {{ isSaving ? "Menyimpan..." : "Simpan Hasil" }}
        </button>
      </form>
    </div>
  </div>
</template>