<template>
  <div class="bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">維護測試與報修說明</h1>

        <div class="space-y-8">
          <!-- 測試說明 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">🧪 如何測試流程</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              本站提供一筆簡易測試資料，可用來驗證上傳、分析與產出摘要的完整流程是否正常。
            </p>
            <div class="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 class="text-lg font-medium text-gray-800">測試資料</h3>
              <p class="text-gray-700">
                測試用 CSV 位於：<strong>data/comments_test.csv</strong>（部署後對應網址為
                <a :href="testCsvUrl" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline break-all">{{ testCsvUrl }}</a>）。
              </p>
              <p class="text-gray-700">
                該檔案為 Polis 匯出的留言格式，內含一筆範例留言，可直接用於「上傳 CSV」流程。
              </p>
              <h3 class="text-lg font-medium text-gray-800 mt-4">測試步驟</h3>
              <ol class="list-decimal list-inside text-gray-700 space-y-2">
                <li>前往<router-link to="/" class="text-democratic-red hover:underline">首頁</router-link>。</li>
                <li>在「Open Router API KEY」欄位輸入<strong>您自己的</strong> Open Router API Key（測試時請使用自己的 Key，本站不會儲存）。</li>
                <li>選擇模型（例如預設的 openai/gpt-oss-120b 或其他 Open Router 支援的模型）。</li>
                <li>點選「選擇檔案」並上傳 <strong>data/comments_test.csv</strong>（或從上述網址下載後上傳）。</li>
                <li>按下「開始分析」，等待處理完成後應會產出摘要；若流程正常即代表測試通過。</li>
              </ol>
            </div>
          </div>

          <!-- API Key 提醒 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">🔑 關於 Open Router API Key</h2>
            <p class="text-gray-700 text-lg leading-relaxed">
              測試時請務必使用<strong>您自己的</strong> Open Router API Key。取得方式可參考
              <router-link to="/guide/openrouter" class="text-democratic-red hover:underline">Open Router 使用指南</router-link>。
              本站不會儲存或上傳您的 API Key 到任何伺服器，僅在瀏覽器端用於呼叫後端轉發至 Open Router。
            </p>
          </div>

          <!-- 故障報修 -->
          <div class="border-b border-gray-200 pb-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">🐛 若發生故障，如何報修（貼 Issue）</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-4">
              若測試過程中出現錯誤、畫面異常或結果不如預期，歡迎到專案 GitHub 回報問題，以利維護者排查與修復。
            </p>
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
              <h3 class="text-lg font-medium text-amber-900">報修步驟</h3>
              <ol class="list-decimal list-inside text-gray-700 space-y-2">
                <li>前往前端專案的 Issues 頁面：<a href="https://github.com/g0v/sensemaker-frontend/issues" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">https://github.com/g0v/sensemaker-frontend/issues</a></li>
                <li>點選「New issue」建立新 Issue。</li>
                <li>標題簡要描述問題（例如：「上傳 comments_test.csv 後分析失敗」）。</li>
                <li>內文請盡量包含：<br>
                  <ul class="list-disc list-inside mt-2 ml-2 space-y-1 text-gray-600">
                    <li>操作步驟（例如：用了測試 CSV、選了哪個模型）。</li>
                    <li>預期結果 vs 實際結果（例如：預期出現摘要，實際出現錯誤訊息）。</li>
                    <li>畫面上的錯誤訊息或截圖（若方便）。</li>
                    <li>瀏覽器與作業系統（例如 Chrome 120 / macOS）。</li>
                  </ul>
                </li>
                <li>若問題與後端 API 有關，可同時到後端專案回報：<a href="https://github.com/bestian/sensemaker-backend/issues" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">sensemaker-backend Issues</a>。</li>
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
            返回首頁
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 測試 CSV 的公開網址（部署後從 public 提供）
const testCsvUrl = computed(() => {
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  return `${base}/data/comments_test.csv`
})

// 頁面標題
document.title = '維護測試與報修說明 - 台灣議題立場分析'
</script>
