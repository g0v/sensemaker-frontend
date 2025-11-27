<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">{{ t('polisGuide.title') }}</h1>

        <!-- 步驟 1: 前往 Polis 首頁 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              1
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('polisGuide.step1Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('polisGuide.step1Description') }}
          </p>
          <div class="ml-14 mb-4">
            <a
              href="https://pol.is/home"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('polisGuide.step1Link') }}
            </a>
          </div>
          <div class="ml-14">
            <img
              :src="homePageImage"
              alt="Polis 首頁截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 2: 註冊帳號與登入 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              2
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('polisGuide.step2Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('polisGuide.step2Description') }}
          </p>
          <div class="ml-14 mb-4">
            <a
              href="https://pol.is/signin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('polisGuide.step2Link') }}
            </a>
          </div>
          <div class="ml-14 space-y-4">
            <img
              :src="signInImage"
              alt="Polis 登入/註冊頁面截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
            <img
              :src="loginImage"
              alt="Polis 登入頁面截圖"
              class="rounded-lg shadow-md border border-gray-200 w-60 max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 3: 在 Polis Dashboard 創建與管理對話 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              3
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('polisGuide.step3Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('polisGuide.step3Description') }}
          </p>
          <div class="ml-14 mb-4">
            <a
              href="https://pol.is/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('polisGuide.step3Link') }}
            </a>
          </div>
          <div class="ml-14">
            <img
              :src="createNewConversationImage"
              alt="Polis 創建新對話截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 4: 釋出意見徵集的網址，收集回應 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              4
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('polisGuide.step4Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('polisGuide.step4Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="distributeImage"
              alt="Polis 釋出意見徵集網址截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 5: 切換到 Reports Tab，創建 Report URL -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              5
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('polisGuide.step5Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('polisGuide.step5Description') }}
          </p>
          <div class="ml-14 space-y-4">
            <img
              :src="createReportUrlImage"
              alt="Polis 創建 Report URL 截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 6: 進入 Report 頁 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              6
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('polisGuide.step6Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('polisGuide.step6Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="gotoReportUrlImage"
              alt="Polis 進入 Report 頁截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 7: 下載 Comments CSV -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              7
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('polisGuide.step7Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('polisGuide.step7Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="downloadCommentsCsvImage"
              alt="Polis 下載 Comments CSV 截圖"
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
              <h3 class="font-semibold text-blue-900 mb-2">{{ t('polisGuide.tipsTitle') }}</h3>
              <ul class="text-blue-800 space-y-1 text-sm">
                <li>{{ t('polisGuide.tip1') }}</li>
                <li>{{ t('polisGuide.tip2') }}</li>
                <li>{{ t('polisGuide.tip3') }}</li>
                <li>{{ t('polisGuide.tip4') }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 底部導航 -->
        <div class="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <router-link
            to="/"
            class="inline-flex md:absolute mx-auto left-0 right-0 w-fit items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {{ t('polisGuide.backToHome') }}
          </router-link>
          <router-link
            to="/guide/openrouter"
            class="group inline-flex items-center gap-1 md:ml-auto text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {{ t('openRouterGuide.title') }}
            <IconArrowNext class="w-4 stroke-blue-600 group-hover:stroke-blue-800" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import homePageImage from '@/assets/screenshots_polis/Polis_HomePage.png?url'
import signInImage from '@/assets/screenshots_polis/Polis_SignIn.png?url'
import loginImage from '@/assets/screenshots_polis/Polis_Login.png?url'
import createNewConversationImage from '@/assets/screenshots_polis/Polis_Create_New_Conversation.png?url'
import distributeImage from '@/assets/screenshots_polis/Polis_Distribute.png?url'
import createReportUrlImage from '@/assets/screenshots_polis/Polis_Create_Report_URL.png?url'
import gotoReportUrlImage from '@/assets/screenshots_polis/Polis_Goto_Report_URL.png?url'
import downloadCommentsCsvImage from '@/assets/screenshots_polis/Polis_Download_Comments.csv.png?url'
import IconArrowNext from '@/components/icons/IconArrowNext.vue'

const { t } = useI18n()
</script>

<style scoped>
/* 自訂樣式 */
</style>

