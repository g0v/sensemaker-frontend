<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { marked } from 'marked'

interface TaskData {
  taskId: string
  status: string
  estimatedTime: string
  commentsCount: number
  model: string
}

interface AnalysisResult {
  status: string
  commentsProcessed: number
  model: string
  completedAt: string
  summary: string
}

const apiKey = ref('')
const model = ref('openai/gpt-oss-120b')
const additionalContext = ref('')
const outputLang = ref('zh-TW')
const selectedFile = ref<File | null>(null)
const isProcessing = ref(false)
const resultMessage = ref('')
const resultType = ref<'success' | 'error' | 'info' | 'warning'>('info')
const isResultHtml = ref(false)
const showResult = ref(false)

// 任務狀態相關
const currentTaskId = ref<string | null>(null)
const pollingInterval = ref<number | null>(null)
const showTaskStatus = ref(false)
const taskData = ref<TaskData>({
  taskId: '',
  status: '',
  estimatedTime: '',
  commentsCount: 0,
  model: ''
})
const pollingMessage = ref('正在輪詢結果...')
const latestSummaryMarkdown = ref('')

// 下載按鈕狀態
const showDownloadButton = ref(false)

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const handleSubmit = async () => {
  if (!selectedFile.value) {
    showResultMessage('請選擇要上傳的文件', 'error')
    return
  }

  isProcessing.value = true
  showResult.value = false
  latestSummaryMarkdown.value = ''
  setDownloadButtonVisible(false)

  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    // 構建 API URL
    let apiUrl = `https://sensemaker-backend.bestian123.workers.dev/api/sensemake?OPENROUTER_MODEL=${encodeURIComponent(model.value)}`

    if (apiKey.value.trim()) {
      apiUrl += `&OPENROUTER_API_KEY=${encodeURIComponent(apiKey.value.trim())}`
    }

    if (additionalContext.value.trim()) {
      apiUrl += `&additionalContext=${encodeURIComponent(additionalContext.value.trim())}`
    }

    if (outputLang.value !== 'en') {
      apiUrl += `&output_lang=${encodeURIComponent(outputLang.value)}`
    }

    showResultMessage('📡 正在發送請求到 API...', 'info')

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.ok && result.success) {
      currentTaskId.value = result.taskId
      taskData.value = {
        taskId: result.taskId,
        status: result.status,
        estimatedTime: result.estimatedTime,
        commentsCount: result.commentsCount || 0,
        model: result.model || model.value
      }

      showTaskStatus.value = true
      startPolling(result.taskId)

      showResultMessage(`✅ 任務已開始！\n\n任務 ID: ${result.taskId}\n狀態: ${result.status}\n預計完成時間: ${result.estimatedTime}`, 'success')
    } else {
      showResultMessage(`❌ 請求失敗 (${response.status}):\n${JSON.stringify(result, null, 2)}`, 'error')
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`❌ 請求錯誤:\n${errorMessage}`, 'error')
  } finally {
    isProcessing.value = false
  }
}

const startPolling = (taskId: string) => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
  }

  // 延遲3分鐘後開始輪詢，每1分鐘檢查一次
  setTimeout(() => {
    console.log('開始輪詢任務結果...')

    // 開始輪詢，每1分鐘檢查一次
    pollingInterval.value = setInterval(async () => {
      await checkTaskResult(taskId)
    }, 60000) // 60秒 = 1分鐘

    // 立即檢查一次
    checkTaskResult(taskId)
  }, 180000) // 180秒 = 3分鐘

  // 顯示延遲提示
  updatePollingStatus(`任務已加入隊列，將在3分鐘後開始檢查結果...`)
}

const checkTaskResult = async (taskId: string) => {
  console.log('checkTaskResult', taskId)
  try {
    const response = await fetch(`https://sensemaker-backend.bestian123.workers.dev/api/sensemake/result/${taskId}`)
    const result = await response.json()

    if (response.ok && result.success) {
      if (result.status === 'completed') {
        // 任務完成，停止輪詢
        if (pollingInterval.value) {
          clearInterval(pollingInterval.value)
          pollingInterval.value = null
        }

        // 隱藏任務狀態
        showTaskStatus.value = false

        // 顯示結果
        showFinalResult(result)
      } else {
        // 更新輪詢狀態
        updatePollingStatus(`任務仍在處理中... (${new Date().toLocaleTimeString()})`)
      }
    } else if (response.status === 404) {
      // 任務還在處理中
      updatePollingStatus(`任務仍在處理中... (${new Date().toLocaleTimeString()})`)
    } else {
      // 任務失敗
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
        pollingInterval.value = null
      }

      showResultMessage(`❌ 任務失敗:\n${JSON.stringify(result, null, 2)}`, 'error')
      showTaskStatus.value = false
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    updatePollingStatus(`輪詢錯誤: ${errorMessage} (${new Date().toLocaleTimeString()})`)
  }
}

const updatePollingStatus = (message: string) => {
  pollingMessage.value = message
}

const showFinalResult = (result: AnalysisResult) => {
  // 儲存 Markdown 字串並啟用下載按鈕
  latestSummaryMarkdown.value = result.summary || ''
  setDownloadButtonVisible(result.summary?.trim().length > 0)

  // 使用 marked 渲染 Markdown 摘要
  const renderedSummary = marked.parse(result.summary || '')

  const resultHtml = `
    <h2>✅ 分析完成！</h2>
    <div style="margin-bottom: 1em;">
      <p><strong>📊 處理了 ${result.commentsProcessed || 'N/A'} 條評論</strong></p>
      <p><strong>🤖 使用模型:</strong> ${result.model || 'N/A'}</p>
      <p><strong>⏰ 完成時間:</strong> ${new Date(result.completedAt).toLocaleString('zh-TW')}</p>
    </div>
    <hr style="margin: 1.5em 0; border: none; border-top: 1px solid #ddd;">
    <h3>📝 摘要:</h3>
    <div class="markdown-content">
      ${renderedSummary}
    </div>
  `

  showResultMessage(resultHtml, 'success', true)
}

const showResultMessage = (message: string, type: 'success' | 'error' | 'info' | 'warning', isHtml = false) => {
  resultMessage.value = message
  resultType.value = type
  isResultHtml.value = isHtml
  showResult.value = true
}

const setDownloadButtonVisible = (visible: boolean) => {
  showDownloadButton.value = visible
}

const downloadMarkdown = () => {
  try {
    if (!latestSummaryMarkdown.value || latestSummaryMarkdown.value.trim().length === 0) {
      showResultMessage('❌ 沒有可下載的 Markdown 內容', 'error')
      return
    }
    const taskId = currentTaskId.value || 'result'
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `sensemake-summary-${taskId}-${timestamp}.md`
    const blob = new Blob([latestSummaryMarkdown.value], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`❌ 下載失敗: ${errorMessage}`, 'error')
  }
}

// 測試功能
const testLLM = async () => {
  try {
    showResultMessage('🔄 正在測試 LLM 連接...', 'info')

    const response = await fetch('https://sensemaker-backend.bestian123.workers.dev/api/test-llm', {
      method: 'POST'
    })

    const result = await response.json()
    if (response.ok && result.success) {
      showResultMessage(`✅ LLM 測試成功！\n\n簡單回應: ${result.simpleResponse}\n\n結構化回應: ${JSON.stringify(result.structuredResponse, null, 2)}\n\n測試評論: ${JSON.stringify(result.testComment, null, 2)}`, 'success')
    } else {
      showResultMessage(`❌ LLM 測試失敗:\n${JSON.stringify(result, null, 2)}`, 'error')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`❌ LLM 測試請求錯誤:\n${errorMessage}`, 'error')
  }
}

const testCSV = async () => {
  if (!selectedFile.value) {
    showResultMessage('❌ 請先選擇 CSV 文件', 'error')
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const response = await fetch('https://sensemaker-backend.bestian123.workers.dev/api/test-csv', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()
    if (response.ok) {
      showResultMessage(`✅ CSV 解析成功！\n\n處理了 ${result.commentsCount} 條評論\n\n詳細結果:\n${JSON.stringify(result, null, 2)}`, 'success')
    } else {
      showResultMessage(`❌ CSV 解析失敗:\n${JSON.stringify(result, null, 2)}`, 'error')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`❌ 請求錯誤:\n${errorMessage}`, 'error')
  }
}

const testR2 = async () => {
  try {
    showResultMessage('🔄 正在測試 R2 讀寫...', 'info')

    const response = await fetch('https://sensemaker-backend.bestian123.workers.dev/api/test-r2', {
      method: 'POST'
    })

    const result = await response.json()
    if (response.ok && result.success) {
      showResultMessage(`✅ R2 測試成功！\n\n讀取的值: ${result.readValue}\n\n自定義元數據: ${JSON.stringify(result.customMetadata, null, 2)}`, 'success')
    } else {
      showResultMessage(`❌ R2 測試失敗:\n${JSON.stringify(result, null, 2)}`, 'error')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`❌ R2 測試請求錯誤:\n${errorMessage}`, 'error')
  }
}

// 健康檢查
const checkHealth = async () => {
  try {
    const response = await fetch('https://sensemaker-backend.bestian123.workers.dev/api/test')
    if (response.ok) {
      console.log('✅ 後端服務運行正常')
    } else {
      console.log('❌ 後端服務異常')
    }
  } catch (error) {
    console.log('❌ 無法連接到後端服務:', error)
  }
}

// 配置 marked 選項
marked.setOptions({
  breaks: true,  // 支持換行符
  gfm: true      // 支持 GitHub 風格的 Markdown
})

// 生命週期
onMounted(() => {
  checkHealth()
})

onUnmounted(() => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">🚀 應用Sensemaker做分析</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label for="apiKey" class="block text-sm font-medium text-gray-700">
              🔑 OpenRouter API Key <span class="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              id="apiKey"
              v-model="apiKey"
              placeholder="請輸入您的 OpenRouter API Key"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
            <div class="text-xs text-gray-600 space-y-1">
              <p class="italic">此欄位為必填，用於連接到 AI 模型服務</p>
              <p class="text-blue-600">
                <span class="font-medium">🔒 隱私保護：</span>根據 <router-link to="/privacy"  class="text-democratic-red hover:underline font-medium">隱私權政策</router-link> ，本站不收集使用者資料，專案開放源碼。如有疑慮，歡迎
                <router-link to="/self-host" class="text-democratic-red hover:underline font-medium">自行架站</router-link>
                後端與前端服務。
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <label for="model" class="block text-sm font-medium text-gray-700">
              🤖 模型名稱:
            </label>
            <input
              type="text"
              id="model"
              v-model="model"
              placeholder="openai/gpt-oss-120b"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
          </div>

          <div class="space-y-2">
            <label for="additionalContext" class="block text-sm font-medium text-gray-700">
              📝 額外上下文 (可選):
            </label>
            <input
              type="text"
              id="additionalContext"
              v-model="additionalContext"
              placeholder="描述對話的背景和環境"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
          </div>

          <div class="space-y-2">
            <label for="outputLang" class="block text-sm font-medium text-gray-700">
              🌐 輸出語言:
            </label>
            <select
              id="outputLang"
              v-model="outputLang"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
              <option value="en">English</option>
              <option value="zh-TW">繁體中文</option>
            </select>
          </div>

          <div class="space-y-2">
            <label for="file" class="block text-sm font-medium text-gray-700">
              📁 上傳文件 (
                <a href="https://polis.tw/" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">polis.tw</a> 導出的 JSON 或
                <a href="https://pol.is/" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">pol.is</a>
                導出的 CSV):
            </label>
            <input
              type="file"
              id="file"
              @change="handleFileSelect"
              accept=".json,.csv,application/json,text/csv"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
          </div>

          <button
            type="submit"
            :disabled="isProcessing || !apiKey.trim()"
            class="w-full bg-democratic-red hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {{ isProcessing ? '⏳ 處理中...' : '🚀 開始分析' }}
          </button>
        </form>
      </div>

      <!-- 任務狀態顯示區域 -->
      <div v-if="showTaskStatus" class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-900 mb-4">📊 任務狀態</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">任務 ID:</span> {{ taskData.taskId }}
          </div>
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">狀態:</span> {{ taskData.status }}
          </div>
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">評論數量:</span> {{ taskData.commentsCount }}
          </div>
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">使用模型:</span> {{ taskData.model }}
          </div>
        </div>
        <div class="text-center p-3 bg-blue-100 rounded-md">
          <div class="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span class="text-blue-800">{{ pollingMessage }}</span>
        </div>
      </div>

      <div
        v-if="showResult"
        :class="[
          'rounded-lg p-4 max-h-96 overflow-y-auto',
          resultType === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : '',
          resultType === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : '',
          resultType === 'info' ? 'bg-blue-50 border border-blue-200 text-blue-800' : '',
          resultType === 'warning' ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' : ''
        ]"
        v-html="isResultHtml ? resultMessage : ''"
      ></div>

      <!-- 測試按鈕區域 -->
      <div class="flex flex-wrap gap-3 mt-6">
        <button
          v-if="showDownloadButton"
          @click="downloadMarkdown"
          class="bg-jade-green hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          ⬇️ 下載 Markdown
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保留一些自定義樣式，如果需要 */
</style>
