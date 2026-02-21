<template>
  <div class="bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">{{ t('maintain.title') }}</h1>

        <div class="space-y-8">
          <!-- 測試說明 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('maintain.testTitle') }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              {{ t('maintain.testIntro') }}
            </p>
            <div class="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 class="text-lg font-medium text-gray-800">{{ t('maintain.testDataLabel') }}</h3>
              <p class="text-gray-700">
                {{ t('maintain.testDataPathBefore') }}
                <a :href="testCsvUrl" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline break-all">{{ testCsvUrl }}</a>{{ t('maintain.testDataPathAfter') }}
              </p>
              <p class="text-gray-700">
                {{ t('maintain.testDataDesc') }}
              </p>
              <h3 class="text-lg font-medium text-gray-800 mt-4">{{ t('maintain.testStepsLabel') }}</h3>
              <ol class="list-decimal list-inside text-gray-700 space-y-2">
                <li>{{ t('maintain.step1') }}<router-link to="/" target="_blank" class="text-democratic-red hover:underline">{{ t('common.home') }}</router-link>{{ t('maintain.step1Suffix') }}</li>
                <li>{{ t('maintain.step2') }}</li>
                <li>{{ t('maintain.step3') }}</li>
                <li>{{ t('maintain.step4') }}</li>
                <li>{{ t('maintain.step5') }}</li>
              </ol>
            </div>
          </div>

          <!-- API Key 提醒 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('maintain.apiKeyTitle') }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed">
              {{ t('maintain.apiKeyDescBefore') }}
              <router-link to="/guide/openrouter" class="text-democratic-red hover:underline">{{ t('maintain.openRouterGuideLink') }}</router-link>
              {{ t('maintain.apiKeyDescAfter') }}
            </p>
          </div>

          <!-- 故障報修 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ t('maintain.reportTitle') }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              {{ t('maintain.reportIntro') }}
            </p>
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
              <h3 class="text-lg font-medium text-amber-900">{{ t('maintain.reportStepsLabel') }}</h3>
              <ol class="list-decimal list-inside text-gray-700 space-y-2">
                <li>{{ t('maintain.reportStep1') }}<a href="https://github.com/g0v/sensemaker-frontend/issues" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">https://github.com/g0v/sensemaker-frontend/issues</a></li>
                <li>{{ t('maintain.reportStep2') }}</li>
                <li>{{ t('maintain.reportStep3') }}</li>
                <li>{{ t('maintain.reportStep4') }}<br>
                  <ul class="list-disc list-inside mt-2 ml-2 space-y-1 text-gray-600">
                    <li>{{ t('maintain.reportStep4Bullet1') }}</li>
                    <li>{{ t('maintain.reportStep4Bullet2') }}</li>
                    <li>{{ t('maintain.reportStep4Bullet3') }}</li>
                    <li>{{ t('maintain.reportStep4Bullet4') }}</li>
                  </ul>
                </li>
                <li>{{ t('maintain.reportStep5') }}<a href="https://github.com/bestian/sensemaker-backend/issues" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">{{ t('maintain.reportStep5Backend') }}</a>{{ t('maintain.reportStep5Suffix') }}</li>
              </ol>
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 測試 CSV 的公開網址（部署後從 public 提供）
const testCsvUrl = computed(() => {
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  return `${base}/data/comments_test.csv`
})
</script>
