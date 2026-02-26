<template>
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Company Info -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <Leaf class="text-green-500 w-8 h-8" />
              <span class="text-2xl font-bold text-white">PalmDetector</span>
            </div>
            <p class="text-gray-400 mb-4">
              Solusi cerdas untuk meningkatkan produktivitas dan kualitas panen kelapa sawit Anda.
            </p>
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <span class="text-lg">f</span>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <span class="text-lg">𝕏</span>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <span class="text-lg">in</span>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <span class="text-lg">IG</span>
              </a>
            </div>
          </div>

          <!-- Product -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Produk</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-green-500 transition-colors">Fitur</a></li>
              <li><a href="#" class="hover:text-green-500 transition-colors">Harga</a></li>
              <li><a href="#" class="hover:text-green-500 transition-colors">Demo</a></li>
              <li><a href="#" class="hover:text-green-500 transition-colors">API</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Perusahaan</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-green-500 transition-colors">Tentang Kami</a></li>
              <li><a href="#" class="hover:text-green-500 transition-colors">Blog</a></li>
              <li><a href="#" class="hover:text-green-500 transition-colors">Karir</a></li>
              <li><a href="#" class="hover:text-green-500 transition-colors">Partner</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4">Kontak</h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-2">
                <Mail class="w-4 h-4 text-green-500" />
                <span class="text-sm">info@palmdetector.id</span>
              </li>
              <li class="flex items-center gap-2">
                <Phone class="w-4 h-4 text-green-500" />
                <span class="text-sm">+62 812-3456-7890</span>
              </li>
              <li class="flex items-start gap-2">
                <MapPin class="w-4 h-4 text-green-500 mt-1" />
                <span class="text-sm">Jl. Perkebunan No. 123<br />Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">
            © 2026 PalmDetector. All rights reserved.
          </p>
          <div class="flex gap-6 text-sm">
            <a href="#" class="hover:text-green-500 transition-colors">Kebijakan Privasi</a>
            <a href="#" class="hover:text-green-500 transition-colors">Syarat & Ketentuan</a>
            <a href="#" class="hover:text-green-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
</template>
