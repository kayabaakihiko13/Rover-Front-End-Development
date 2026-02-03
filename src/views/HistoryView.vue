<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = ref([])
const loading = ref(true)
const error = ref(null)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// ✅ Fungsi aman untuk gabung URL
const getImageUrl = (path) => {
  if (!path) return '/placeholder-image.jpg'
  const base = API_BASE_URL.replace(/\/+$/, "")
  const cleanPath = path.replace(/^\/+/, "")
  return `${base}/${cleanPath}`
}

const fetchHistory = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/posts/history`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.detail || 'Gagal memuat histori')
    }

    const data = await response.json()
    posts.value = data
  } catch (err) {
    console.error('Error fetching history:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getLabelCounter = (post) => {
  const result = post.result || {}
  
  // Format 1: { predict: { "Matang": 2 } }
  if (result.predict && typeof result.predict === 'object') {
    return Object.entries(result.predict)
  }
  
  // Format 2: { labels: [...], counters: [...] }
  if (Array.isArray(result.labels) && Array.isArray(result.counters)) {
    const counter = {}
    result.labels.forEach((label, i) => {
      counter[label] = (counter[label] || 0) + (result.counters[i] || 1)
    })
    return Object.entries(counter)
  }
  
  return []
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

onMounted(() => {
  fetchHistory()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">
      Histori Deteksi Kamu
    </h1>

    <div v-if="loading" class="text-gray-600">Memuat histori...</div>

    <div v-else-if="error" class="text-red-600 text-center">
      {{ error }}
    </div>

    <div v-else-if="posts.length > 0" class="w-full max-w-6xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in posts"
          :key="post.post_id"
          class="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-xl"
        >
          <img
            :src="getImageUrl(post.image_url)"
            alt="Hasil Deteksi"
            class="w-full h-48 object-contain bg-gray-50 p-4"
            @error="(e) => e.target.src = 'https://via.placeholder.com/150?text=Gambar+Tidak+Tersedia'"
          />

          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-2">
                Diunggah: {{ formatDate(post.create_at) }}
              </p>

              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="[label, count] in getLabelCounter(post)"
                  :key="label"
                  class="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full"
                >
                  {{ label.charAt(0).toUpperCase() + label.slice(1) }} ×{{ count }}
                </span>
              </div>
            </div>

            <a
              :href="getImageUrl(post.image_url)"
              target="_blank"
              rel="noopener noreferrer"
              class="block mt-2 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
            >
              Lihat Gambar
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center text-lg mt-6">
      Belum ada histori deteksi 😢
    </div>

    <router-link
      to="/dashboard"
      class="mt-8 text-green-600 hover:text-green-700 font-medium hover:underline"
    >
      ← Kembali ke Dashboard
    </router-link>
  </div>
</template>