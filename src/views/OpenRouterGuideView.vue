<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">{{ t('openRouterGuide.title') }}</h1>

        <!-- 步驟 1: 進入 OpenRouter 首頁 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              1
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('openRouterGuide.step1Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14" v-html="t('openRouterGuide.step1Description')">
          </p>
          <div class="ml-14 mb-4">
            <a
              href="https://openrouter.ai/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('openRouterGuide.step1Link') }}
            </a>
          </div>
          <div class="ml-14 space-y-4">
            <img
              :src="homePageImage"
              alt="OpenRouter 首頁截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
            <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-gray-700 text-sm">
                {{ t('openRouterGuide.step1Tip') }}
              </p>
            </div>
            <img
              :src="dropdownImage"
              alt="OpenRouter 個人頭像下拉選單截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 2: 儲值 Credits -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              2
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('openRouterGuide.step2Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('openRouterGuide.step2Description') }}
          </p>
          <div class="ml-14 mb-4">
            <a
              href="https://openrouter.ai/settings/credits"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('openRouterGuide.step2Link') }}
            </a>
          </div>
          <div class="ml-14">
            <img
              :src="buyCreditsImage"
              alt="OpenRouter 儲值 Credits 截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 3: 申請 API Key -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              3
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('openRouterGuide.step3Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('openRouterGuide.step3Description') }}
          </p>
          <div class="ml-14 mb-4">
            <a
              href="https://openrouter.ai/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('openRouterGuide.step3Link') }}
            </a>
          </div>
          <div class="ml-14">
            <img
              :src="createApiKeyImage"
              alt="OpenRouter 建立 API Key 截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 提示區塊 -->
        <div class="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-blue-900 mb-2">{{ t('openRouterGuide.tipsTitle') }}</h3>
              <ul class="text-blue-800 space-y-1 text-sm">
                <li>{{ t('openRouterGuide.tip1') }}</li>
                <li>{{ t('openRouterGuide.tip2') }}</li>
                <li>{{ t('openRouterGuide.tip3') }}</li>
                <li>{{ t('openRouterGuide.tip4') }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 底部導航 -->
        <div class="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <router-link
            to="/guide/polis"
            class="items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            ⭠ {{ t('polisGuide.title') }}
          </router-link>
          <router-link
            to="/"
            class="inline-flex md:absolute mx-auto left-0 right-0 w-fit items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {{ t('openRouterGuide.backToHome') }}
          </router-link>
          <router-link
            to="/guide/sensemaker"
            class="items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {{ t('sensemakerGuide.title') }} ⭢
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import homePageImage from '@/assets/screenshots_open_router/OpenRouter_HomePage.png?url'
import dropdownImage from '@/assets/screenshots_open_router/Open_Router_Dropdown.png?url'
import buyCreditsImage from '@/assets/screenshots_open_router/OpenRouter_Buy_Credits.png?url'
import createApiKeyImage from '@/assets/screenshots_open_router/OpenRouter_Create_API_Key.png?url'

const { t } = useI18n()
</script>

<style scoped>
/* 自訂樣式 */
</style>

