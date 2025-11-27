<template>
  <div class="bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">{{ t('privacy.title') }}</h1>

        <div class="space-y-8">
          <!-- 隱私權政策 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('privacy.privacyPolicy') }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed">
              {{ t('privacy.privacyDescription') }}
            </p>
          </div>

          <!-- 額外說明 -->
          <div class="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ t('privacy.dataProcessingTitle') }}</h3>
            <div class="space-y-4">
              <div class="border-l-4 border-democratic-red pl-4">
                <p class="text-gray-700">
                  <strong>{{ t('privacy.backendProcessing') }}</strong>
                </p>
              </div>
              <div class="border-l-4 border-democratic-red pl-4">
                <p class="text-gray-700">
                  <strong>{{ t('privacy.noCookies') }}</strong>
                </p>
              </div>
              <div class="border-l-4 border-democratic-red pl-4">
                <p class="text-gray-700">
                  <strong>{{ t('privacy.openSource') }}</strong>
                </p>
                <div class="mt-2 space-y-2">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 4.624-5.479 4.862.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <a href="https://github.com/g0v/sensemaker-frontend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">
                      {{ t('privacy.frontendProject') }}
                    </a>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 4.624-5.479 4.862.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <a href="https://github.com/bestian/sensemaker-backend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">
                      {{ t('privacy.backendProject') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 返回按鈕 -->
        <div class="text-center mt-8">
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 bg-democratic-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {{ t('common.backToHome') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 頁面標題
document.title = `${t('privacy.privacyPolicy')} - ${t('home.title')}`
</script>

<style scoped>
/* 使用專案的 democratic-red 顏色 */
.border-democratic-red {
  border-color: #D80000;
}

.bg-democratic-red {
  background-color: #D80000;
}

.hover\:bg-red-700:hover {
  background-color: #B91C1C;
}
</style>
