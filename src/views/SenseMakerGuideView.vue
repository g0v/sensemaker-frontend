<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">SenseMaker 使用指南</h1>

        <!-- 步驟 1: 上傳 Polis 導出的原始檔 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              1
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">上傳 Polis 導出的原始檔</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            首先，請上傳從 Polis 下載的 CSV 檔案。這個檔案包含了所有參與者的評論資料，是進行分析的基礎資料。請確保檔案格式正確，且包含必要的欄位資訊。
          </p>
          <div class="ml-14">
            <img
              :src="uploadCsvImage"
              alt="SenseMaker 上傳 CSV 檔案截圖"
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
            <h2 class="text-2xl font-semibold text-gray-800">輸入 OpenRouter API Key</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            在對應的欄位中輸入您的 OpenRouter API Key。這個 API Key 用於連接 OpenRouter 服務，讓系統能夠使用 AI 模型進行分析。請確保 API Key 正確且有效。
          </p>
          <div class="ml-14">
            <img
              :src="enterApiKeyImage"
              alt="SenseMaker 輸入 API Key 截圖"
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
            <h2 class="text-2xl font-semibold text-gray-800">模型名稱保留 openai/gpt-oss-120b</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            系統預設使用 <b>openai/gpt-oss-120b</b> 模型進行分析。這是一個高品質、深思且平價的模型，非常適合用於意見分析。建議保持此設定，除非您有特殊需求。
          </p>
          <div class="ml-14 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p class="text-blue-800 text-sm">
              <strong>提示：</strong>模型名稱欄位已預設為 <code class="bg-blue-100 px-2 py-1 rounded">openai/gpt-oss-120b</code>，通常不需要修改。
            </p>
          </div>
        </div>

        <!-- 步驟 4: 可輸入額外上下文，來優化語言模型的分析脈絡 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">
              4
            </span>
            <h2 class="text-2xl font-semibold text-gray-800">輸入額外上下文，優化語言模型的分析脈絡</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            您可以選擇性地輸入額外的上下文資訊，例如對話的主題背景、相關政策說明、或特定的分析重點。這些資訊可以幫助 AI 模型更準確地理解評論的脈絡，提供更深入的分析結果。
          </p>
          <div class="ml-14">
            <img
              :src="additionalInformationImage"
              alt="SenseMaker 輸入額外上下文截圖"
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
            <h2 class="text-2xl font-semibold text-gray-800">選擇輸出語言</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            選擇您希望報告使用的語言。例如選擇「中文」後，分析報告將以中文呈現，讓您更容易閱讀和理解分析結果。
          </p>
          <div class="ml-14">
            <img
              :src="outputLangImage"
              alt="SenseMaker 選擇輸出語言截圖"
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
            <h2 class="text-2xl font-semibold text-gray-800">開始分析</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            確認所有設定無誤後，點擊「開始分析」按鈕。系統會開始處理您的資料，這個過程可能需要幾分鐘的時間，請耐心等待。您可以在頁面上看到分析進度的相關資訊。
          </p>
          <div class="ml-14">
            <img
              :src="startAnalyseImage"
              alt="SenseMaker 開始分析截圖"
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
            <h2 class="text-2xl font-semibold text-gray-800">檢閱並下載 Markdown 報告</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">
            分析完成後，系統會生成一份 Markdown 格式的分析報告。您可以在頁面上預覽報告內容，確認無誤後點擊下載按鈕，將報告儲存到您的電腦。報告包含詳細的分析結果、統計資料和洞察建議。
          </p>
          <div class="ml-14">
            <img
              :src="waitAndDownloadMarkdownReportImage"
              alt="SenseMaker 檢閱並下載 Markdown 報告截圖"
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
                <li>• 確保上傳的 CSV 檔案格式正確，且包含必要的欄位</li>
                <li>• API Key 請妥善保管，不要分享給他人</li>
                <li>• 分析過程可能需要幾分鐘，請耐心等待，不要關閉頁面</li>
                <li>• 下載的 Markdown 報告可以用任何支援 Markdown 的編輯器開啟</li>
                <li>• 如果分析失敗，請檢查 API Key 是否有效，以及 Credits 餘額是否充足</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import uploadCsvImage from '@/assets/screenshots_sensemaker/Sensemaker_Upload_CSV.png?url'
import enterApiKeyImage from '@/assets/screenshots_sensemaker/Sensemaker_Enter_API_Key.png?url'
import additionalInformationImage from '@/assets/screenshots_sensemaker/Sensemaker_Addtional_Information.png?url'
import outputLangImage from '@/assets/screenshots_sensemaker/Sensemaker_Output_Lang.png?url'
import startAnalyseImage from '@/assets/screenshots_sensemaker/Sensemaker_Start_Analyse.png?url'
import waitAndDownloadMarkdownReportImage from '@/assets/screenshots_sensemaker/Sensemaker_Wait_and_Download_markdown_report.png?url'
</script>

<style scoped>
/* 自訂樣式 */
</style>

