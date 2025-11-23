<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">OpenRouter 使用指南</h1>

        <!-- 步驟 1: 進入 OpenRouter 首頁 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              1
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">進入 OpenRouter 首頁</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            首先，請前往 OpenRouter 官方網站。OpenRouter 是一個統一的 LLM 介面，提供多種 AI 模型供您選擇。本工具主要使用高品質、深思、平價的<b>GPT-OSS-120B</b>模型。
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
              前往 OpenRouter 首頁：https://openrouter.ai/
            </a>
          </div>
          <div class="ml-14">
            <img
              :src="homePageImage"
              alt="OpenRouter 首頁截圖"
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
            <h2 class="text-2xl font-semibold text-gray-800">儲值 Credits</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            在使用 OpenRouter 的服務之前，您需要先購買信用點數(Credits)。Credits 可以用於任何模型或提供者，讓您靈活使用不同的 AI 服務。
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
              前往儲值頁面：https://openrouter.ai/settings/credits
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
            <h2 class="text-2xl font-semibold text-gray-800">申請 API Key</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            最後，您需要建立一個 API Key 才能開始使用 OpenRouter 的服務。API Key 完全相容於 OpenAI 的格式，可以直接使用。
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
              前往 API Key 設定頁面：https://openrouter.ai/settings/keys
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
              <h3 class="font-semibold text-blue-900 mb-2">重要提示</h3>
              <ul class="text-blue-800 space-y-1 text-sm">
                <li>• 請妥善保管您的 API Key，不要分享給他人</li>
                <li>• API Key 建立後即可立即使用，無需等待審核</li>
                <li>• 建議定期檢查您的 Credits 餘額，確保服務正常運作</li>
                <li>• OpenRouter 支援多種付款方式，包括信用卡等</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import homePageImage from '@/assets/screenshots_open_router/OpenRouter_HomePage.png?url'
import buyCreditsImage from '@/assets/screenshots_open_router/OpenRouter_Buy_Credits.png?url'
import createApiKeyImage from '@/assets/screenshots_open_router/OpenRouter_Create_API_Key.png?url'
</script>

<style scoped>
/* 自訂樣式 */
</style>

