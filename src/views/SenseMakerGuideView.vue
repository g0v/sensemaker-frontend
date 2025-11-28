<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">{{ t('sensemakerGuide.title') }}</h1>

        <!-- 步驟 1: 上傳 Polis 導出的原始檔 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              1
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('sensemakerGuide.step1Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('sensemakerGuide.step1Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="uploadCsvImage"
              alt="Sensemaker 上傳 CSV 檔案截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 2: 輸入 OpenRouter API Key -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              2
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('sensemakerGuide.step2Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('sensemakerGuide.step2Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="enterApiKeyImage"
              alt="Sensemaker 輸入 API Key 截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 3: 模型名稱保留 openai/gpt-oss-120b -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              3
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('sensemakerGuide.step3Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14" v-html="t('sensemakerGuide.step3Description')">
          </p>
          <div class="ml-14 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-blue-800 text-sm">
              <strong>{{ t('sensemakerGuide.step3Tip') }}</strong> <code class="bg-blue-100 px-2 py-1 rounded">{{ t('sensemakerGuide.step3TipCode') }}</code>{{ t('sensemakerGuide.step3TipEnd') }}
            </p>
          </div>
        </div>

        <!-- 步驟 4: 可輸入額外上下文，來優化語言模型的分析脈絡 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              4
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('sensemakerGuide.step4Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('sensemakerGuide.step4Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="additionalInformationImage"
              alt="Sensemaker 輸入額外上下文截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 5: 選擇輸出語言 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              5
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('sensemakerGuide.step5Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('sensemakerGuide.step5Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="outputLangImage"
              alt="Sensemaker 選擇輸出語言截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 6: 開始分析 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              6
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('sensemakerGuide.step6Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('sensemakerGuide.step6Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="startAnalyseImage"
              alt="Sensemaker 開始分析截圖"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 7: 檢閱並下載 Markdown 報告 -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              7
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('sensemakerGuide.step7Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            {{ t('sensemakerGuide.step7Description') }}
          </p>
          <div class="ml-14">
            <img
              :src="waitAndDownloadMarkdownReportImage"
              alt="Sensemaker 檢閱並下載 Markdown 報告截圖"
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
              <h3 class="font-semibold text-blue-900 mb-2">{{ t('sensemakerGuide.tipsTitle') }}</h3>
              <ul class="text-blue-800 space-y-1 text-sm">
                <li>{{ t('sensemakerGuide.tip1') }}</li>
                <li>{{ t('sensemakerGuide.tip2') }}</li>
                <li>{{ t('sensemakerGuide.tip3') }}</li>
                <li>{{ t('sensemakerGuide.tip4') }}</li>
                <li>{{ t('sensemakerGuide.tip5') }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 底部導航 -->
        <div class="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <router-link
            to="/guide/openrouter"
            class="group inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <IconArrowPrev class="w-4 stroke-blue-600 group-hover:stroke-blue-800" />
            {{ t('openRouterGuide.title') }}
          </router-link>
          <router-link
            to="/"
            class="inline-flex md:absolute mx-auto left-0 right-0 w-fit items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {{ t('sensemakerGuide.backToHome') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import uploadCsvImage from '@/assets/screenshots_sensemaker/Sensemaker_Upload_CSV.png?url'
import enterApiKeyImage from '@/assets/screenshots_sensemaker/Sensemaker_Enter_API_Key.png?url'
import additionalInformationImage from '@/assets/screenshots_sensemaker/Sensemaker_Addtional_Information.png?url'
import outputLangImage from '@/assets/screenshots_sensemaker/Sensemaker_Output_Lang.png?url'
import startAnalyseImage from '@/assets/screenshots_sensemaker/Sensemaker_Start_Analyse.png?url'
import waitAndDownloadMarkdownReportImage from '@/assets/screenshots_sensemaker/Sensemaker_Wait_and_Download_markdown_report.png?url'
import IconArrowPrev from '@/components/icons/IconArrowPrev.vue'

const { t } = useI18n()
</script>

<style scoped>
/* 自訂樣式 */
</style>

