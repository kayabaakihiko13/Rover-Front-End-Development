// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env variables berdasarkan mode
  const env = loadEnv(mode, process.cwd(), '');
  const port = parseInt(env.FE_PORT_EXPOSE, 10);
  return {  //output: return object config
    plugins: [
      vue(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("src", import.meta.url)),
      },
    },

    // ekspos env ke define untuk akses di global
    define: {
      __APP_MODE__: JSON.stringify(mode),
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },

    // konfigurasi server
    server: {
      host: "0.0.0.0",
      port: port,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    }
  }
})