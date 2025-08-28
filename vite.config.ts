import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // 優化 Cloudflare Pages 建置
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      // 強制使用純 JavaScript 版本
      external: ['@rollup/rollup-linux-x64-gnu'],
    },
  },
  // 確保在 CI 環境中正確處理依賴
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu'],
  },
  // 環境變數
  define: {
    'process.env.ROLLUP_NATIVE': 'false'
  }
})
