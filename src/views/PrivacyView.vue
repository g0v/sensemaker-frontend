<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">隱私權政策 / Privacy Policy</h1>

      <div class="space-y-8">
        <!-- 中文版本 -->
        <div class="border-b border-gray-200 pb-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">隱私權政策</h2>
          <p class="text-gray-700 text-lg leading-relaxed">
            這款應用程式不會蒐集任何個人資料。您的資料不會以任何方式被使用或儲存，因為我們不會蒐集任何個人資料。生成的報告會暫時存儲於 R2 儲存服務中供您下載，並以唯一的 taskID 識別，其他使用者無法取得或存取您的資料。
          </p>
        </div>

        <!-- English Version -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
          <p class="text-gray-700 text-lg leading-relaxed">
            This application does not collect any private data whatsoever. Your data will not be used or stored in any way because we do not collect any personal information. Generated reports are temporarily stored in R2 storage service for your download and cannot be accessed by other users.
          </p>
        </div>

        <!-- 額外說明 -->
        <div class="bg-gray-50 rounded-lg p-6 mt-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">關於資料處理 / About Data Processing</h3>
          <div class="space-y-4">
            <div class="border-l-4 border-democratic-red pl-4">
              <p class="text-gray-700">
                <strong>後端運算：</strong>資料會傳送到後端進行運算處理，但後端不會儲存任何使用者的個人資料和敏感資訊，特別是API KEY不會被儲存。
              </p>
              <p class="text-gray-600 text-xs mt-1 italic">
                <em>Backend Processing: Data is sent to our backend for computation, but no user data is stored on our servers, especially API keys are never stored.</em>
              </p>
            </div>
            <div class="border-l-4 border-democratic-red pl-4">
              <p class="text-gray-700">
                <strong>無追蹤：</strong>我們不使用任何追蹤技術或 cookies 來收集使用者資訊。
              </p>
              <p class="text-gray-600 text-xs mt-1 italic">
                <em>No Tracking: We do not use any tracking technologies or cookies to collect user information.</em>
              </p>
            </div>
            <div class="border-l-4 border-democratic-red pl-4">
              <p class="text-gray-700">
                <strong>開源透明：</strong>我們的程式碼完全開源，您可以檢視所有功能以確保隱私安全。
              </p>
              <div class="mt-2 space-y-2">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 4.624-5.479 4.862.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/g0v/sensemaker-frontend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">
                    前端專案 (Frontend)
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 4.624-5.479 4.862.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/bestian/sensemaker-backend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">
                    後端專案 (Backend)
                  </a>
                </div>
              </div>
              <p class="text-gray-600 text-sm mt-2">
                <em>Open Source Transparency: Our code is completely open source, and you can review all functionality to ensure privacy. Check our frontend and backend repositories on GitHub.</em>
              </p>
            </div>
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
</template>

<script setup lang="ts">
// 頁面標題
document.title = '隱私權政策 - Sensemaker意見綜整器'
</script>

<style scoped>
/* 使用專案的 democratic-red 顏色 */
.border-democratic-red {
  border-color: #D80000;
}

.bg-democratic-red {
  background-color: #D80000;
}

.hover\:bg-red-700:hover {
  background-color: #B91C1C;
}
</style>
