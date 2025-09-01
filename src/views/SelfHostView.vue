<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
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
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">{{ t('selfHost.step2Frontend') }}</h3>
              <p class="text-gray-700 mb-3">
                {{ t('selfHost.step2FrontendDesc') }}
              </p>
              <div class="bg-gray-100 p-3 rounded text-sm font-mono text-xs">
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
