<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'

interface TaskData {
  taskId: string
  status: string
  estimatedTime: string
  commentsCount: number
  model: string
}

interface ResultMessage {
  type: 'success' | 'error' | 'info' | 'warning'
  isHtml: boolean
  content: string
}

interface AnalysisResult {
  status: string
  commentsProcessed: number
  model: string
  completedAt: string
  summary: string
}

// 重試機制相關介面
interface RetryData {
  apiKey: string
  model: string
  file: File
  additionalContext: string
  outputLang: string
}

const { t } = useI18n()

// 提示卡相關變數
const showGuideModal = ref(false)
const dontShowAgain = ref(false)
watch(showGuideModal, () => {
  document.body.style.overflow = showGuideModal.value ? 'hidden' : ''
})
onBeforeRouteLeave(() => {
  showGuideModal.value = false
})

const apiKey = ref('')
const model = ref('openai/gpt-oss-120b')
const additionalContext = ref('')
const outputLang = ref('zh-TW')
const selectedFile = ref<File | null>(null)
const isProcessing = ref(false)
const resultMessageList = ref<ResultMessage[]>([])

// 重試機制相關變數
const retryMode = ref<'strict' | 'normal' | 'custom'>('normal')
const customRetryCount = ref(3)
const currentRetryCount = ref(0)
const maxRetryCount = ref(3)
const storedRetryData = ref<RetryData | null>(null)

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
const pollingMessage = ref('')
const latestSummaryMarkdown = ref('')

// 下載按鈕狀態
const showDownloadButton = ref(false)

// 重試模式變更處理
const handleRetryModeChange = () => {
  switch (retryMode.value) {
    case 'strict':
      maxRetryCount.value = 1
      break
    case 'normal':
      maxRetryCount.value = 3
      break
    case 'custom':
      maxRetryCount.value = Math.max(1, customRetryCount.value)
      break
  }
}

// 儲存重試數據到 Vue 響應式系統
const storeRetryData = () => {
  if (selectedFile.value) {
    storedRetryData.value = {
      apiKey: apiKey.value,
      model: model.value,
      file: selectedFile.value,
      additionalContext: additionalContext.value,
      outputLang: outputLang.value
    }
  }
}

// 重試請求
const retryRequest = async (): Promise<string | null> => {
  if (!storedRetryData.value) {
    console.error('沒有儲存的重試數據')
    return null
  }

  console.log(`🔄 重試第 ${currentRetryCount.value} 次 (最大 ${maxRetryCount.value} 次)`)

  try {
    const formData = new FormData()
    formData.append('file', storedRetryData.value.file)

    // 構建 API URL
    const apiUrl = 'https://sensemaker-backend.bestian123.workers.dev/api/sensemake'
    formData.append('openRouterModel', storedRetryData.value.model)

    if (storedRetryData.value.apiKey.trim()) {
      formData.append('openRouterApiKey', storedRetryData.value.apiKey.trim())
    }

    if (storedRetryData.value.additionalContext.trim()) {
      formData.append('additionalContext', storedRetryData.value.additionalContext.trim())
    }

    if (storedRetryData.value.outputLang !== 'en') {
      formData.append('outputLang', storedRetryData.value.outputLang)
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.status === 401) {
      const msg = result.message || t('home.invalidApiKey') || 'Invalid API Key'
      appendResultMessage(msg, 'error')
      return null
    }

    if (response.ok && result.success) {
      // 重試成功，返回新的 taskId
      return result.taskId
    } else {
      // 重試失敗
      appendResultMessage(`${t('home.retryFailed')} (${response.status}):\n${JSON.stringify(result, null, 2)}`, 'error')
      return null
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    appendResultMessage(`${t('home.retryError')}:\n${errorMessage}`, 'error')
    return null
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const handleSubmit = async () => {
  resultMessageList.value.length = 0

  if (!selectedFile.value) {
    appendResultMessage(t('home.selectFileFirst'), 'error')
    return
  }

  // 重置重試計數
  currentRetryCount.value = 0

  // 儲存重試數據
  storeRetryData()

  isProcessing.value = true
  latestSummaryMarkdown.value = ''
  setDownloadButtonVisible(false)

  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    // 構建 API URL
    const apiUrl = 'https://sensemaker-backend.bestian123.workers.dev/api/sensemake'
    formData.append('openRouterModel', model.value)

    if (apiKey.value.trim()) {
      formData.append('openRouterApiKey', apiKey.value.trim())
    }

    if (additionalContext.value.trim()) {
      formData.append('additionalContext', additionalContext.value.trim())
    }

    if (outputLang.value !== 'en') {
      formData.append('outputLang', outputLang.value)
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.status === 401) {
      console.log(result.message)
      const msg = t('home.invalidApiKey')
      appendResultMessage(msg, 'error')
      showTaskStatus.value = false
      return
    }

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
    } else if (response.status === 500 && retryMode.value !== 'strict') {
      // 500 錯誤且啟用了重試機制，使用循環重試
      console.log('❌ 500 錯誤，開始重試機制')
      let retryTaskId: string | null = null
      let retryAttempts = 0

      // 循環重試，直到成功或達到最大重試次數
      while (retryAttempts < maxRetryCount.value && !retryTaskId) {
        retryAttempts++
        currentRetryCount.value = retryAttempts
        console.log(`🔄 重試第 ${retryAttempts} 次 (最大 ${maxRetryCount.value} 次)`)

        retryTaskId = await retryRequest()
        if (!retryTaskId && retryAttempts < maxRetryCount.value) {
          // 等待 2 秒後再重試
          await new Promise<void>(resolve => setTimeout(resolve, 2000))
        }
      }

      if (retryTaskId) {
        // 重試成功，開始輪詢新任務
        currentTaskId.value = retryTaskId
        taskData.value = {
          taskId: retryTaskId,
          status: 'processing',
          estimatedTime: 'N/A',
          commentsCount: 0,
          model: model.value
        }
        showTaskStatus.value = true
        startPolling(retryTaskId)
      } else {
        appendResultMessage(`${t('home.allRetriesFailed')}`, 'error')
      }
    } else {
      appendResultMessage(`${t('home.requestFailed')} (${response.status}):\n${JSON.stringify(result, null, 2)}`, 'error')
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (retryMode.value !== 'strict') {
      console.log('❌ 請求錯誤，開始重試機制')
      let retryTaskId: string | null = null
      let retryAttempts = 0

      // 循環重試，直到成功或達到最大重試次數
      while (retryAttempts < maxRetryCount.value && !retryTaskId) {
        retryAttempts++
        currentRetryCount.value = retryAttempts
        console.log(`🔄 重試第 ${retryAttempts} 次 (最大 ${maxRetryCount.value} 次)`)

        retryTaskId = await retryRequest()
        if (!retryTaskId && retryAttempts < maxRetryCount.value) {
          // 等待 2 秒後再重試
          await new Promise<void>(resolve => setTimeout(resolve, 2000))
        }
      }

      if (retryTaskId) {
        // 重試成功，開始輪詢新任務
        currentTaskId.value = retryTaskId
        taskData.value = {
          taskId: retryTaskId,
          status: 'processing',
          estimatedTime: 'N/A',
          commentsCount: 0,
          model: model.value
        }
        showTaskStatus.value = true
        startPolling(retryTaskId)
      } else {
        appendResultMessage(`${t('home.allRetriesFailed')}`, 'error')
      }
    } else {
      appendResultMessage(`${t('home.requestError')}:\n${errorMessage}`, 'error')
    }
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
    }, 60 * 1000) // 60秒 = 1分鐘

    // 立即檢查一次
    checkTaskResult(taskId)
  }, 3 * 60 * 1000) // 3分鐘 = 3分鐘

  // 顯示延遲提示
  updatePollingStatus(t('home.taskInQueue'))
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
        updatePollingStatus(`${t('home.taskProcessing')} (${new Date().toLocaleTimeString()})`)
      }
    } else if (response.status === 404) {
      // 任務還在處理中
      updatePollingStatus(`${t('home.taskProcessing')} (${new Date().toLocaleTimeString()})`)
    } else if (response.status === 500) {
      // 500 錯誤 - 任務處理失敗
      console.error('❌ 任務處理失敗 (500):', result)
      appendResultMessage(failedMsgHtml({
        taskId: result.taskId,
        failedAt: result.failedAt,
        message: result.message,
        error: result.error
      }), 'error', true)

      if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
        pollingInterval.value = null
      }

      // 隱藏任務狀態
      showTaskStatus.value = false

      // 檢查是否啟用了重試機制
      if (retryMode.value !== 'strict' && storedRetryData.value && currentRetryCount.value < maxRetryCount.value) {
        console.log('❌ 輪詢遇到 500 錯誤，開始重試機制')

        let retrySuccess = false
        let retryAttempts = currentRetryCount.value

        // 循環重試，直到成功或達到最大重試次數
        while (retryAttempts < maxRetryCount.value && !retrySuccess) {
          retryAttempts++
          currentRetryCount.value = retryAttempts
          console.log(`🔄 重試第 ${retryAttempts} 次 (最大 ${maxRetryCount.value} 次)`)

          const retryTaskId = await retryRequest()
          if (retryTaskId) {
            // 重試成功，開始輪詢新任務
            currentTaskId.value = retryTaskId
            taskData.value = {
              taskId: retryTaskId,
              status: 'processing',
              estimatedTime: 'N/A',
              commentsCount: 0,
              model: storedRetryData.value.model
            }
            showTaskStatus.value = true
            startPolling(retryTaskId)
            retrySuccess = true
          } else if (retryAttempts < maxRetryCount.value) {
            // 等待 2 秒後再重試
            await new Promise<void>(resolve => setTimeout(resolve, 2000))
          }
        }

        if (!retrySuccess) {
          // 顯示最終錯誤訊息
          appendResultMessage(t('home.allRetriesFailed'), 'error')
        }
      }
    } else {
      // 其他錯誤
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
        pollingInterval.value = null
      }

      appendResultMessage(`${t('home.requestFailed')}:\n${JSON.stringify(result, null, 2)}`, 'error')
      showTaskStatus.value = false
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ 輪詢請求錯誤:', errorMessage)

        // 檢查是否啟用了重試機制
    if (retryMode.value !== 'strict' && storedRetryData.value && currentRetryCount.value < maxRetryCount.value) {
      console.log('❌ 輪詢遇到網絡錯誤，開始重試機制')
      appendResultMessage(`${t('home.requestError')} - ${t('home.retryingRequest')}`, 'info')

      let retrySuccess = false
      let retryAttempts = currentRetryCount.value

      // 循環重試，直到成功或達到最大重試次數
      while (retryAttempts < maxRetryCount.value && !retrySuccess) {
        retryAttempts++
        currentRetryCount.value = retryAttempts
        console.log(`🔄 重試第 ${retryAttempts} 次 (最大 ${maxRetryCount.value} 次)`)

        const retryTaskId = await retryRequest()
        if (retryTaskId) {
          // 重試成功，開始輪詢新任務
          currentTaskId.value = retryTaskId
          taskData.value = {
            taskId: retryTaskId,
            status: 'processing',
            estimatedTime: 'N/A',
            commentsCount: 0,
            model: storedRetryData.value.model
          }
          showTaskStatus.value = true
          startPolling(retryTaskId)
          retrySuccess = true
        } else if (retryAttempts < maxRetryCount.value) {
          // 等待 2 秒後再重試
          await new Promise<void>(resolve => setTimeout(resolve, 2000))
        }
      }

      if (!retrySuccess) {
        appendResultMessage(`${t('home.allRetriesFailed')}`, 'error')
      }
    } else {
      updatePollingStatus(`${t('home.requestError')}: ${errorMessage} (${new Date().toLocaleTimeString()})`)
    }
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
    <h2>${t('home.taskCompleted')}</h2>
    <div style="margin-bottom: 1em;">
      <p><strong>📊 ${t('home.commentsProcessed', { count: result.commentsProcessed || 'N/A' })}</strong></p>
      <p><strong>🤖 ${t('home.model')}:</strong> ${result.model || 'N/A'}</p>
      <p><strong>⏰ ${t('home.completedAt')}:</strong> ${new Date(result.completedAt).toLocaleString('zh-TW')}</p>
    </div>
    <hr style="margin: 1.5em 0; border: none; border-top: 1px solid #ddd;">
    <h3>📝 ${t('home.summary')}:</h3>
    <div class="markdown-content">
      ${renderedSummary}
    </div>
  `

  appendResultMessage(resultHtml, 'success', true)
}

const appendResultMessage = (message: string, type: 'success' | 'error' | 'info' | 'warning', isHtml = false) => {
  resultMessageList.value.push({
    type,
    isHtml,
    content: message
  })
}

function failedMsgHtml(
  { taskId, failedAt, message, error }: { taskId: string, failedAt: number, message: string, error: string}
) {
  return `
    <h2>${t('home.taskFailed')}</h2>
    <div>
      <p><strong>${t('home.taskId')}:</strong> ${taskId}</p>
      <p><strong>${t('home.failedAt')}:</strong> ${new Date(failedAt).toLocaleString('zh-TW')}</p>
      <p><strong>${t('home.errorMessage')}:</strong> ${message}</p>
      <p><strong>${t('home.detailedError')}:</strong> ${error}</p>
    </div>
  `
}

const setDownloadButtonVisible = (visible: boolean) => {
  showDownloadButton.value = visible
}

const downloadMarkdown = async () => {
  try {
    if (!latestSummaryMarkdown.value || latestSummaryMarkdown.value.trim().length === 0) {
      appendResultMessage(t('home.noMarkdownContent'), 'error')
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

    // 下載成功後，通知後端刪除 R2 上的報告資料
    await deleteTaskReport(taskId)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    appendResultMessage(`${t('home.downloadFailed')}: ${errorMessage}`, 'error')
  }
}

// 刪除任務報告
const deleteTaskReport = async (taskId: string) => {
  try {
    console.log(`🗑️ 刪除任務報告: ${taskId}`)

    const response = await fetch(`https://sensemaker-backend.bestian123.workers.dev/api/sensemake/delete/${taskId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      console.log(`✅ 任務報告 ${taskId} 已成功刪除`)
    } else {
      console.warn(`⚠️ 刪除任務報告 ${taskId} 失敗: ${response.status}`)
    }
  } catch (error) {
    console.error(`❌ 刪除任務報告 ${taskId} 時發生錯誤:`, error)
    // 不顯示錯誤訊息給用戶，因為下載已經成功
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

// 關閉提示卡
const closeGuideModal = () => {
  showGuideModal.value = false
  if (dontShowAgain.value) {
    localStorage.setItem('dontShowGuide', 'true')
  }
}

// 生命週期
onMounted(() => {
  checkHealth()
  // 檢查是否已經選擇不再顯示提示
  const dontShow = localStorage.getItem('dontShowGuide')
  if (!dontShow) {
    showGuideModal.value = true
  }
})

onUnmounted(() => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
  }
})
</script>

<template>
  <!-- 提示卡遮罩和卡片 -->
  <div
    v-if="showGuideModal"
    class="fixed inset-0 z-[1000] flex items-center justify-center"
    @click.self="closeGuideModal"
  >
    <!-- 半透明遮罩 -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- 提示卡 -->
    <div class="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- 關閉按鈕 -->
      <button
        @click="closeGuideModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        aria-label="關閉"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- 提示卡內容 -->
      <div class="p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">{{ t('guideModal.title') }}</h2>
        <p class="text-gray-700 mb-3 text-sm text-center">
          {{ t('guideModal.description') }}
        </p>

        <!-- 語言切換 -->
        <div class="w-fit ml-auto mb-6">
          <LanguageSwitcher />
        </div>

        <!-- 三個圖文區塊 - 響應式排版 -->
        <div class="flex flex-col md:flex-row gap-6 mb-6">


          <!-- 區塊 1: Polis -->
          <div class="flex-1 bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="mb-4 flex justify-center">
              <div class="w-32 h-32 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg class="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- 收集意見的象徵 - 對話框和意見收集 -->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  <!-- 多個意見點 -->
                  <circle cx="8" cy="10" r="1" fill="currentColor" />
                  <circle cx="12" cy="10" r="1" fill="currentColor" />
                  <circle cx="16" cy="10" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">{{ t('guideModal.polisTitle') }}</h3>
            <p class="text-gray-700 mb-3 text-sm text-left">
              {{ t('guideModal.polisDescription') }}
            </p>
            <div class="text-center">
              <router-link
                to="/guide/polis"
                class="text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                {{ t('guideModal.polisLink') }}
              </router-link>
            </div>
          </div>

          <!-- 區塊 2: OpenRouter -->
          <div class="flex-1 bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="mb-4 flex justify-center">
              <div class="w-32 h-32 bg-purple-50 rounded-lg flex items-center justify-center">
                <svg class="w-20 h-20 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- 聰明的 AI 的象徵 - 大腦和連接節點 -->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">{{ t('guideModal.openRouterTitle') }}</h3>
            <p class="text-gray-700 mb-3 text-sm text-left">
              {{ t('guideModal.openRouterDescription') }}
            </p>
            <div class="text-center">
              <router-link
                to="/guide/openrouter"
                class="text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                {{ t('guideModal.openRouterLink') }}
              </router-link>
            </div>
          </div>

          <!-- 區塊 3: Sensemaker -->
          <div class="flex-1 bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div class="mb-4 flex justify-center">
              <div class="w-32 h-32 bg-green-50 rounded-lg flex items-center justify-center">
                <svg class="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <!-- 綜整的象徵 - 圖表和整理 -->
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 text-center">{{ t('guideModal.sensemakerTitle') }}</h3>
            <p class="text-gray-700 mb-3 text-sm text-left">
              {{ t('guideModal.sensemakerDescription') }}
            </p>
            <div class="text-center">
              <router-link
                to="/guide/sensemaker"
                class="text-blue-600 hover:text-blue-800 hover:underline text-sm"
              >
                {{ t('guideModal.sensemakerLink') }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- 提示訊息 -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p class="text-sm text-blue-800 text-center">
            {{ t('guideModal.tip') }}
          </p>
        </div>

        <!-- 不再顯示選項和確認按鈕 -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
          <label class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="dontShowAgain"
              class="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            >
            <span class="text-sm text-gray-700">{{ t('guideModal.dontShowAgain') }}</span>
          </label>
          <button
            @click="closeGuideModal"
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            {{ t('guideModal.iKnow') }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">{{ t('home.title') }}</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label for="file" class="block text-sm font-medium text-gray-700">
              {{ t('home.fileLabel') }}
            </label>
            <input
              type="file"
              id="file"
              @change="handleFileSelect"
              accept=".json,.csv,application/json,text/csv"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red text-black dark:text-black"
            >
          </div>

          <div class="space-y-2">
            <label for="apiKey" class="block text-sm font-medium text-gray-700">
              {{ t('home.apiKeyLabel') }} <span class="text-red-500 font-bold">*</span>
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                class="ml-2 text-blue-600 hover:text-blue-800 hover:underline text-xs font-normal"
              >
                {{ t('home.getApiKeyLink') }}
              </a>
            </label>
            <input
              type="text"
              id="apiKey"
              v-model="apiKey"
              :placeholder="t('home.apiKeyPlaceholder')"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
            <div class="text-xs text-gray-600 space-y-1">
              <p class="italic">{{ t('home.apiKeyRequired') }}</p>
              <p class="text-blue-600">
                <span class="font-medium">{{ t('home.privacyNote') }}</span>
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <label for="model" class="block text-sm font-medium text-gray-700">
              {{ t('home.modelLabel') }} <span class="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              id="model"
              v-model="model"
              :placeholder="t('home.modelPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
            <div class="text-xs text-gray-600 space-y-1">
              <p class="italic">{{ t('home.modelNote') }}</p>
              <p class="text-orange-600 font-medium">{{ t('home.costNote') }}</p>
              <p class="text-blue-600 font-medium">{{ t('home.timeNote') }}</p>
              <p class="text-blue-600">
                <a href="https://openrouter.ai/models" target="_blank" rel="noopener noreferrer" class="hover:underline">
                  {{ t('home.modelLinkText') }}
                </a>
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <label for="additionalContext" class="block text-sm font-medium text-gray-700">
              {{ t('home.additionalContextLabel') }}
            </label>

            <!-- 灰色斜體提示文字 -->
            <p class="text-gray-500 text-sm italic">
              {{ t('home.additionalContextNote') }}
            </p>

            <input
              type="text"
              id="additionalContext"
              v-model="additionalContext"
              :placeholder="t('home.additionalContextPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
          </div>

          <div class="space-y-2">
            <label for="outputLang" class="block text-sm font-medium text-gray-700">
              {{ t('home.outputLangLabel') }}
            </label>
            <select
              id="outputLang"
              v-model="outputLang"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
              <option value="en">{{ t('home.outputLangOptions.en') }}</option>
              <option value="zh-TW">{{ t('home.outputLangOptions.zh-TW') }}</option>
              <option value="zh-CN">{{ t('home.outputLangOptions.zh-CN') }}</option>
              <option value="ja">{{ t('home.outputLangOptions.ja') }}</option>
              <option value="fr">{{ t('home.outputLangOptions.fr') }}</option>
              <option value="es">{{ t('home.outputLangOptions.es') }}</option>
            </select>
          </div>


          <!-- 風險提醒 -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div class="flex items-start gap-2">
              <div>
                <p class="text-yellow-800 text-sm leading-relaxed">
                  {{ t('home.riskWarning') }}
                </p>
              </div>
            </div>
          </div>

          <!-- 重試模式選擇 -->
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700">
              {{ t('home.retryModeLabel') }}
            </label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="retryMode"
                  value="strict"
                  @change="handleRetryModeChange"
                  class="mr-2"
                >
                <span class="text-sm text-gray-700">{{ t('home.retryModeStrict') }}</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="retryMode"
                  value="normal"
                  @change="handleRetryModeChange"
                  class="mr-2"
                >
                <span class="text-sm text-gray-700">{{ t('home.retryModeNormal') }}</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  v-model="retryMode"
                  value="custom"
                  @change="handleRetryModeChange"
                  class="mr-2"
                >
                <span class="text-sm text-gray-700">{{ t('home.retryModeCustom') }}</span>
              </label>
            </div>



            <!-- 自定義重試次數輸入 -->
            <div v-if="retryMode === 'custom'" class="ml-6 space-y-2">
              <label for="customRetryCount" class="block text-sm font-medium text-gray-700">
                {{ t('home.customRetryCountLabel') }}
              </label>
              <input
                type="number"
                id="customRetryCount"
                v-model="customRetryCount"
                min="1"
                max="10"
                @input="handleRetryModeChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
              >
              <p class="text-xs text-gray-600">{{ t('home.customRetryCountNote') }}</p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isProcessing || !apiKey.trim()"
            class="w-full bg-democratic-red hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {{ isProcessing ? t('home.processing') : t('home.startAnalysis') }}
          </button>
        </form>
      </div>

      <!-- 任務狀態顯示區域 -->
      <div v-if="showTaskStatus" class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-900 mb-4">{{ t('home.taskStatus') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 mb-4">
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">{{ t('home.taskId') }}:</span> {{ taskData.taskId }}
          </div>
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">{{ t('home.status') }}:</span> {{ taskData.status }}
          </div>
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">{{ t('home.commentsCount') }}:</span> {{ taskData.commentsCount }}
          </div>
          <div class="bg-blue-100 p-3 rounded-md">
            <span class="font-medium text-blue-800">{{ t('home.model') }}:</span> {{ taskData.model }}
          </div>
        </div>
        <div class="flex justify-center items-center p-3 bg-blue-100 rounded-md">
          <div class="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span class="text-blue-800">{{ pollingMessage }}</span>
        </div>

        <!-- 重試進度顯示 -->
        <div v-if="currentRetryCount > 0" class="text-center p-3 bg-orange-100 rounded-md mt-3">
          <div class="inline-block w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span class="text-orange-800">🔄 重試第 {{ currentRetryCount }} 次 (最大 {{ maxRetryCount }} 次)</span>
        </div>
      </div>

      <div v-if="resultMessageList.length > 0" class="flex flex-col gap-4">
        <div
          v-for="(message, index) in resultMessageList"
          :key="index"
          :class="[
            'rounded-lg p-4 max-h-96 overflow-y-auto',
            message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : '',
            message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : '',
            message.type === 'info' ? 'bg-blue-50 border border-blue-200 text-blue-800' : '',
            message.type === 'warning' ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' : ''
          ]"
        >
          <div v-if="message.isHtml" v-html="message.content"></div>
          <div v-else>
            {{ message.content }}
          </div>
        </div>
      </div>

      <!-- 測試按鈕區域 -->
      <div class="flex flex-wrap gap-3 mt-6">
        <button
          v-if="showDownloadButton"
          @click="downloadMarkdown"
          class="bg-jade-green hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          {{ t('home.downloadMarkdown') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保留一些自定義樣式，如果需要 */
</style>
