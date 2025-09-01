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
    include: ['vue-i18n']
  },
  // 環境變數
  define: {
    'process.env.ROLLUP_NATIVE': 'false',
    // 確保 i18n 在生產環境中正確工作 (vue-i18n v9)
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
    __VUE_I18N_COMPOSITION_API__: true
  }
})
