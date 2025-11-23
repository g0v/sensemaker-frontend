<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Polis 使用指南</h1>

        <!-- 步驟 1: 前往 Polis 首頁 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              1
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">前往 Polis 首頁</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            首先，請前往 Polis 官方網站。Polis 是一個用於收集和分析群眾意見的平台，可以幫助您了解不同觀點並進行有意義的意見徵集。
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
              前往 Polis 首頁：https://pol.is/home
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
            <h2 class="text-2xl font-semibold text-gray-800">註冊帳號與登入</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            如果您還沒有 Polis 帳號，請先註冊一個新帳號。如果已有帳號，請直接登入。登入後您就可以開始創建和管理對話了。
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
              前往登入/註冊頁面：https://pol.is/signin
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
            <h2 class="text-2xl font-semibold text-gray-800">在 Polis Dashboard 創建與管理對話</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            登入後，您會進入 Polis Dashboard。在這裡您可以創建新的對話（Conversation），並管理現有的對話。點擊「Create New Conversation」按鈕即可開始創建新的對話。
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
              前往 Polis Dashboard：https://pol.is/
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
            <h2 class="text-2xl font-semibold text-gray-800">釋出意見徵集的網址，收集回應</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            創建對話後，您可以取得意見徵集的網址並分享給參與者。參與者可以透過這個網址進入對話並提供他們的意見。您也可以使用 embed 功能將對話嵌入到您的網站中，讓參與者直接在您的網站上參與意見徵集。
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
            <h2 class="text-2xl font-semibold text-gray-800">切換到 Reports Tab，創建 Report URL</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            在對話頁面中，切換到「Reports」標籤頁。在這裡您可以創建報告 URL，用於查看對話的分析結果和統計資料。
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
            <h2 class="text-2xl font-semibold text-gray-800">進入 Report 頁</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            在 Reports 標籤頁中，點擊您想要查看的 Report 項目。點擊後會出現連結，再點擊該連結即可進入 Report 頁面，查看詳細的分析結果。
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
            <h2 class="text-2xl font-semibold text-gray-800">下載 Comments CSV</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            在 Report 頁面中，向下滾動找到下載選項。您會看到一個下載按鈕，點擊即可下載包含所有評論的 CSV 檔案（檔名格式為 {...}-comments.csv）。這個 CSV 檔案包含了對話中的所有評論資料，可以用於進一步的分析。
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
              <h3 class="font-semibold text-blue-900 mb-2">重要提示</h3>
              <ul class="text-blue-800 space-y-1 text-sm">
                <li>• 下載的 CSV 檔案包含對話中的所有評論資料</li>
                <li>• CSV 檔案可以用於匯入到本系統進行進一步的分析</li>
                <li>• 確保您有權限訪問該對話的 Report 頁面</li>
                <li>• 如果找不到下載按鈕，請確認您已切換到正確的 Report 頁面</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 回首頁連結 -->
        <div class="mt-8 text-center">
          <router-link
            to="/"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            回首頁
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import homePageImage from '@/assets/screenshots_polis/Polis_HomePage.png?url'
import signInImage from '@/assets/screenshots_polis/Polis_SignIn.png?url'
import loginImage from '@/assets/screenshots_polis/Polis_Login.png?url'
import createNewConversationImage from '@/assets/screenshots_polis/Polis_Create_New_Conversation.png?url'
import distributeImage from '@/assets/screenshots_polis/Polis_Distribute.png?url'
import createReportUrlImage from '@/assets/screenshots_polis/Polis_Create_Report_URL.png?url'
import gotoReportUrlImage from '@/assets/screenshots_polis/Polis_Goto_Report_URL.png?url'
import downloadCommentsCsvImage from '@/assets/screenshots_polis/Polis_Download_Comments.csv.png?url'
</script>

<style scoped>
/* 自訂樣式 */
</style>

