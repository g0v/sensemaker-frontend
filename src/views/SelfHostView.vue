<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">🏗️ 自行架站指南 / Self-Hosting Guide</h1>

      <div class="space-y-8">
        <!-- 概述 -->
        <div class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-2xl font-semibold text-blue-900 mb-4">📋 概述</h2>
          <p class="text-blue-800 text-lg leading-relaxed">
            如果您對隱私和資料安全有疑慮，歡迎 fork 我們的專案並自行架設服務。這樣您可以完全控制自己的資料和 API 金鑰。
          </p>
          <p class="text-blue-700 text-xs mt-3 italic">
            <em>If you have concerns about privacy and data security, you're welcome to fork our project and self-host the service. This way you have complete control over your data and API keys.</em>
          </p>

          <!-- 付費方案提醒 -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <div class="flex items-start gap-2">
              <div class="w-5 h-5 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">💰</div>
              <div>
                <h3 class="text-yellow-900 font-medium mb-2">付費方案需求</h3>
                <p class="text-yellow-800 text-sm mb-2">
                  後端服務使用 Cloudflare Queues 功能，需要 Worker 付費方案。免費方案不支援此功能。
                </p>
                <p class="text-yellow-700 text-xs italic">
                  <em>The backend service uses Cloudflare Queues which requires a paid Worker plan. Free plans do not support this feature.</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 後端架設 -->
        <div class="border-l-4 border-democratic-red pl-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">🔧 後端架設 (Cloudflare Worker)</h2>
          <p class="text-gray-600 text-xs italic mb-4">
            <em>Backend Setup (Cloudflare Worker)</em>
          </p>
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">步驟 1: Fork 後端專案</h3>
              <p class="text-gray-700 mb-3">
                前往 <a href="https://github.com/bestian/sensemaker-backend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">sensemaker-backend</a> 專案並 fork 到您的 GitHub 帳號
              </p>
              <p class="text-gray-600 text-xs italic">
                <em>Go to the <a href="https://github.com/bestian/sensemaker-backend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">sensemaker-backend</a> project and fork it to your GitHub account</em>
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">步驟 2: 設定 Cloudflare Worker</h3>
              <p class="text-gray-700 mb-3">
                在 Cloudflare Dashboard 中創建新的 Worker，並部署您的後端程式碼
              </p>
              <p class="text-gray-600 text-xs italic mb-3">
                <em>Create a new Worker in Cloudflare Dashboard and deploy your backend code</em>
              </p>
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3">
                <p class="text-yellow-800 text-sm">
                  <strong>⚠️ 重要提醒：</strong>後端會用到 Cloudflare Queues 功能，需要租用 Worker 付費方案。免費方案不支援 Queues。
                </p>
                <p class="text-yellow-700 text-xs mt-1 italic">
                  <em>Note: The backend uses Cloudflare Queues which requires a paid Worker plan. Free plans do not support Queues.</em>
                </p>
              </div>
              <ul class="text-gray-700 text-sm space-y-1 ml-4">
                <li>• 登入 <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">Cloudflare Dashboard</a></li>
                <li>• 創建新的 Worker</li>
                <li>• 上傳您的後端程式碼</li>
                <li>• 設定必要的環境變數</li>
                <li>• 升級到付費方案以啟用 Queues 功能</li>
              </ul>
              <p class="text-gray-600 text-xs italic mt-2">
                <em>• Login to Cloudflare Dashboard • Create new Worker • Upload your backend code • Set necessary environment variables • Upgrade to paid plan to enable Queues</em>
              </p>
            </div>
          </div>
        </div>

        <!-- 前端架設 -->
        <div class="border-l-4 border-jade-green pl-6">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">🎨 前端架設 (Vue.js)</h2>
          <p class="text-gray-600 text-xs italic mb-4">
            <em>Frontend Setup (Vue.js)</em>
          </p>
          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">步驟 1: Fork 前端專案</h3>
              <p class="text-gray-700 mb-3">
                前往 <a href="https://github.com/g0v/sensemaker-frontend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">sensemaker-frontend</a> 專案並 fork 到您的 GitHub 帳號
              </p>
              <p class="text-gray-600 text-xs italic">
                <em>Go to the <a href="https://github.com/g0v/sensemaker-frontend" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">sensemaker-frontend</a> project and fork it to your GitHub account</em>
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">步驟 2: 修改 API 端點</h3>
              <p class="text-gray-700 mb-3">
                在 <code class="bg-gray-200 px-2 py-1 rounded">src/views/HomeView.vue</code> 中，將 API URL 改為您的 Worker 網址：
              </p>
              <p class="text-gray-600 text-xs italic mb-3">
                <em>In <code class="bg-gray-200 px-1 py-0.5 rounded">src/views/HomeView.vue</code>, change the API URL to your Worker URL:</em>
              </p>
              <div class="bg-gray-100 p-3 rounded text-sm font-mono text-xs">
                // 原本的 URL<br>
                // https://sensemaker-backend.bestian123.workers.dev/api/sensemake<br><br>
                // 改為您的 URL<br>
                // https://your-worker.your-subdomain.workers.dev/api/sensemake
              </div>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">步驟 3: 部署前端</h3>
              <p class="text-gray-700 mb-3">
                您可以選擇多種部署方式，建議使用Cloudflare Pages：
              </p>
              <p class="text-gray-600 text-xs italic mb-3">
                <em>You can choose from multiple deployment methods, we recommend using Cloudflare Pages:</em>
              </p>
              <ul class="text-gray-700 text-sm space-y-1 ml-4">
                <li>• <strong>Cloudflare Pages:</strong> 免費、與 Worker 整合良好</li>
              </ul>
              <p class="text-gray-600 text-xs italic mt-2">
                <em>• <strong>Cloudflare Pages:</strong> Free, integrates well with Workers</em>
              </p>
            </div>
          </div>
        </div>

        <!-- 優勢說明 -->
        <div class="bg-green-50 rounded-lg p-6">
          <h2 class="text-2xl font-semibold text-green-900 mb-4">✅ 自行架站的優勢</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div class="flex items-start gap-2">
                <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                <div>
                  <h4 class="font-medium text-green-800">完全控制</h4>
                  <p class="text-green-700 text-xs italic">
                    <em>Full control: Your data is completely under your control and will not pass through a third-party server</em>
                  </p>
                  <p class="text-green-700 text-sm">您的資料完全由您掌控，不會經過第三方伺服器</p>
                  <p class="text-gray-600 text-xs italic">
                    <em>Full control: Your data is completely under your control and will not pass through a third-party server</em>
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                <div>
                  <h4 class="font-medium text-green-800">API 金鑰完全保障</h4>
                  <p class="text-green-700 text-xs italic">
                    <em>Full protection: Your API keys are kept completely within your environment and never passed through a third-party server</em>
                  </p>
                  <p class="text-green-700 text-sm">您的 API 金鑰只存在於您的環境中，不經過第三方伺服器處理</p>
                  <p class="text-gray-600 text-xs italic">
                    <em>Full protection: Your API keys are kept completely within your environment and never passed through a third-party server</em>
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-start gap-2">
                <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                <div>
                  <h4 class="font-medium text-green-800">客製化</h4>
                  <p class="text-green-700 text-xs italic">
                    <em>Customizable: You can modify the functionality and interface according to your needs</em>
                  </p>
                  <p class="text-green-700 text-sm">可以根據需求修改功能和介面</p>
                  <p class="text-gray-600 text-xs italic">
                    <em>Customizable: You can modify the functionality and interface according to your needs</em>
                  </p>
                </div>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">✓</div>
                <div>
                  <h4 class="font-medium text-green-800">學習機會</h4>
                  <p class="text-green-700 text-xs italic">
                    <em>Learn more about modern web development technology</em>
                  </p>
                  <p class="text-green-700 text-sm">深入了解現代 Web 開發技術</p>
                  <p class="text-gray-600 text-xs italic">
                    <em>Learn more about modern web development technology</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 技術支援 -->
        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-2xl font-semibold text-yellow-900 mb-4">🆘 需要幫助？</h2>
          <p class="text-yellow-800 text-xs italic mb-4">
            <em>Need Help?</em>
          </p>
          <p class="text-yellow-800 mb-4">
            如果在架設過程中遇到問題，歡迎：
          </p>
          <p class="text-yellow-700 text-xs italic mb-4">
            <em>If you encounter problems during setup, you're welcome to:</em>
          </p>
          <ul class="text-yellow-800 space-y-2 ml-4">
            <li>• 在 GitHub 專案中開啟 <a href="https://github.com/g0v/sensemaker-frontend/issues" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">Issue</a></li>
            <li>• 查看專案的 README 和 Wiki</li>
            <li>• 加入我們的社群討論</li>
          </ul>
          <ul class="text-yellow-700 text-xs italic space-y-2 ml-4 mt-2">
            <li><em>• Open an <a href="https://github.com/g0v/sensemaker-frontend/issues" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline font-medium">Issue</a> in the GitHub project</em></li>
            <li><em>• Check the project's README and Wiki</em></li>
            <li><em>• Join our community discussions</em></li>
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
          返回首頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 頁面標題
document.title = '自行架站指南 - Sensemaker意見綜整器'
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
