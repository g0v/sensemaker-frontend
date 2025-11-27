<template>
  <div class="bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">{{ t('selfHost.title') }}</h1>

        <div class="space-y-8">
          <!-- 概述 -->
          <div class="bg-blue-50 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-blue-900 mb-4">{{ t('selfHost.overviewTitle') }}</h2>
            <p class="text-blue-800 text-lg leading-relaxed">
              {{ t('selfHost.overviewDescription') }}
            </p>

            <!-- 付費方案提醒 -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <div class="flex items-start gap-2">
                <div class="w-5 h-5 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">💰</div>
                <div>
                  <h3 class="text-yellow-900 font-medium mb-2">{{ t('selfHost.paidPlanTitle') }}</h3>
                  <p class="text-yellow-800 text-sm mb-2">
                    {{ t('selfHost.paidPlanDescription') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 後端架設 -->
          <div class="border-l-4 border-democratic-red pl-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('selfHost.backendTitle') }}</h2>
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">{{ t('selfHost.step1Backend') }}</h3>
                <p class="text-gray-700 mb-3">
                  {{ t('selfHost.step1BackendDesc') }}
                </p>
                <a
                  href="https://github.com/bestian/sensemaker-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 mt-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 4.624-5.479 4.862.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {{ t('selfHost.viewBackendProject') }}
                </a>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">{{ t('selfHost.step2Backend') }}</h3>
                <p class="text-gray-700 mb-3">
                  {{ t('selfHost.step2BackendDesc') }}
                </p>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
                  <p class="text-yellow-800 text-sm">
                    <strong>{{ t('selfHost.importantNote') }}</strong>
                  </p>
                </div>
                <ul class="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• {{ t('selfHost.cloudflareLogin') }}</li>
                  <li>• {{ t('selfHost.createWorker') }}</li>
                  <li>• {{ t('selfHost.uploadCode') }}</li>
                  <li>• {{ t('selfHost.setEnvVars') }}</li>
                  <li>• {{ t('selfHost.upgradePlan') }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 前端架設 -->
          <div class="border-l-4 border-jade-green pl-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('selfHost.frontendTitle') }}</h2>
            <div class="space-y-4">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">{{ t('selfHost.step1Frontend') }}</h3>
                <p class="text-gray-700 mb-3">
                  {{ t('selfHost.step1FrontendDesc') }}
                </p>
                <a
                  href="https://github.com/g0v/sensemaker-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 mt-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 4.624-5.479 4.862.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {{ t('selfHost.viewFrontendProject') }}
                </a>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">{{ t('selfHost.step2Frontend') }}</h3>
                <p class="text-gray-700 mb-3">
                  {{ t('selfHost.step2FrontendDesc') }}
                </p>
                <div class="bg-gray-900 p-3 rounded font-mono text-xs">
                  // {{ t('selfHost.originalURL') }}<br>
                  // https://sensemaker-backend.bestian123.workers.dev/api/sensemake<br><br>
                  // {{ t('selfHost.yourURL') }}<br>
                  // https://your-worker.your-subdomain.workers.dev/api/sensemake
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">{{ t('selfHost.step3Frontend') }}</h3>
                <p class="text-gray-700 mb-3">
                  {{ t('selfHost.step3FrontendDesc') }}
                </p>
                <ul class="text-gray-700 text-sm space-y-1 ml-4">
                  <li>• <strong>{{ t('selfHost.cloudflarePages') }}</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 優勢說明 -->
          <div class="bg-green-50 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-green-900 mb-4">{{ t('selfHost.advantagesTitle') }}</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 class="font-medium text-green-800">{{ t('selfHost.fullControl') }}</h4>
                    <p class="text-green-700 text-sm">{{ t('selfHost.fullControlDesc') }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 class="font-medium text-green-800">{{ t('selfHost.apiKeyProtection') }}</h4>
                    <p class="text-green-700 text-sm">{{ t('selfHost.apiKeyProtectionDesc') }}</p>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 class="font-medium text-green-800">{{ t('selfHost.customizable') }}</h4>
                    <p class="text-green-700 text-sm">{{ t('selfHost.customizableDesc') }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                  <div>
                    <h4 class="font-medium text-green-800">{{ t('selfHost.learning') }}</h4>
                    <p class="text-green-700 text-sm">{{ t('selfHost.learningDesc') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 技術支援 -->
          <div class="bg-yellow-50 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-yellow-900 mb-4">{{ t('selfHost.needHelpTitle') }}</h2>
            <p class="text-yellow-800 mb-4">
              {{ t('selfHost.needHelpDesc') }}
            </p>
            <ul class="text-yellow-800 space-y-2 ml-4">
              <li>• {{ t('selfHost.openIssue') }}</li>
              <li>• {{ t('selfHost.checkReadme') }}</li>
              <li>• {{ t('selfHost.joinCommunity') }}</li>
            </ul>
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
document.title = `${t('selfHost.title')} - ${t('home.title')}`
</script>

<style scoped>
/* 使用專案的顏色 */
.border-democratic-red {
  border-color: #D80000;
}

.border-jade-green {
  border-color: #10B981;
}

.bg-democratic-red {
  background-color: #D80000;
}

.hover\:bg-red-700:hover {
  background-color: #B91C1C;
}

/* 代碼樣式 */
code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>
