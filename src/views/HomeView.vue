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
  <div class="container">
    <h1>🚀 Sensemaker API 測試</h1>



    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="apiKey">🔑 OpenRouter API Key <span class="required">*</span></label>
        <input
          type="text"
          id="apiKey"
          v-model="apiKey"
          placeholder="請輸入您的 OpenRouter API Key"
          required
        >
        <small class="help-text">此欄位為必填，用於連接到 AI 模型服務</small>
      </div>

      <div class="form-group">
        <label for="model">🤖 模型名稱 (可選，若無API Key，則使用後端環境變數配置):</label>
        <input
          type="text"
          id="model"
          v-model="model"
          placeholder="openai/gpt-oss-120b"
        >
      </div>

      <div class="form-group">
        <label for="additionalContext">📝 額外上下文 (可選):</label>
        <input
          type="text"
          id="additionalContext"
          v-model="additionalContext"
          placeholder="描述對話的背景和環境"
        >
      </div>

      <div class="form-group">
        <label for="outputLang">🌐 輸出語言:</label>
        <select id="outputLang" v-model="outputLang">
          <option value="en">English</option>
          <option value="zh-TW">繁體中文</option>
        </select>
      </div>

      <div class="form-group">
        <label for="file">📁 上傳文件 (JSON 或 CSV):</label>
        <input
          type="file"
          id="file"
          @change="handleFileSelect"
          accept=".json,.csv,application/json,text/csv"
          required
        >
      </div>

      <button type="submit" :disabled="isProcessing || !apiKey.trim()">
        {{ isProcessing ? '⏳ 處理中...' : '🚀 開始分析' }}
      </button>
    </form>

    <!-- 任務狀態顯示區域 -->
    <div v-if="showTaskStatus" class="task-status">
      <h3>📊 任務狀態</h3>
      <div class="task-info">
        <div><strong>任務 ID:</strong> {{ taskData.taskId }}</div>
        <div><strong>狀態:</strong> {{ taskData.status }}</div>
        <div><strong>評論數量:</strong> {{ taskData.commentsCount }}</div>
        <div><strong>使用模型:</strong> {{ taskData.model }}</div>
      </div>
      <div class="polling-status">
        <div class="spinner"></div>
        <span>{{ pollingMessage }}</span>
      </div>
    </div>

    <div
      v-if="showResult"
      :class="['result', resultType]"
      v-html="isResultHtml ? resultMessage : ''"
    ></div>

    <!-- 測試按鈕區域 -->
    <div class="test-buttons">
      <button
        v-if="showDownloadButton"
        @click="downloadMarkdown"
        class="test-btn"
      >⬇️ 下載 Markdown</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.container > div {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.required {
  color: #dc3545;
  font-weight: bold;
}

.help-text {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #6c757d;
  font-style: italic;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"], input[type="file"], select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  max-height: 600px;
  overflow-y: auto;
  line-height: 1.6;
}

.success {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.info {
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  color: #0c5460;
}

.warning {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
}



/* 任務狀態樣式 */
.task-status {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
}

.task-status h3 {
  margin-top: 0;
  color: #495057;
}

.task-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 15px 0;
}

.task-info div {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 3px;
}

.task-info strong {
  color: #495057;
}

.polling-status {
  text-align: center;
  padding: 10px;
  background-color: #e3f2fd;
  border-radius: 3px;
  margin: 10px 0;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Markdown 樣式優化 */
.result h1, .result h2, .result h3, .result h4, .result h5, .result h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}

.result h1 { font-size: 1.8em; }
.result h2 { font-size: 1.6em; }
.result h3 { font-size: 1.4em; }
.result h4 { font-size: 1.2em; }

.result p {
  margin-bottom: 1em;
}

.result ul, .result ol {
  margin-bottom: 1em;
  padding-left: 2em;
}

.result li {
  margin-bottom: 0.5em;
}

.result strong {
  color: #2c3e50;
  font-weight: 600;
}

.result em {
  color: #7f8c8d;
  font-style: italic;
}

.result code {
  background-color: #f8f9fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

.result pre {
  background-color: #f8f9fa;
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
  border: 1px solid #e9ecef;
}

.result blockquote {
  border-left: 4px solid #007bff;
  margin: 1em 0;
  padding-left: 1em;
  color: #6c757d;
}

.test-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.test-btn {
  padding: 10px 20px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  width: auto;
}

.test-btn:hover {
  background-color: #138496;
}

.test-btn:active {
  background-color: #117a8b;
}

.test-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.test-btn:disabled:hover {
  background-color: #ccc;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .container > div {
    padding: 20px;
  }

  .task-info {
    grid-template-columns: 1fr;
  }

  .test-buttons {
    flex-direction: column;
  }

  .test-btn {
    width: 100%;
  }
}
</style>
