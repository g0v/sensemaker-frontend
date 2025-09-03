<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
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

// 重試機制相關介面
interface RetryData {
  apiKey: string
  model: string
  file: File
  additionalContext: string
  outputLang: string
}

const { t } = useI18n()

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

// 新增錯誤狀態變數
const errorData = ref<{
  taskId: string
  status: string
  failedAt: string
  message: string
  error: string
} | null>(null)

const showTaskError = ref(false)

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
    let apiUrl = `https://sensemaker-backend.bestian123.workers.dev/api/sensemake?OPENROUTER_MODEL=${encodeURIComponent(storedRetryData.value.model)}`

    if (storedRetryData.value.apiKey.trim()) {
      apiUrl += `&OPENROUTER_API_KEY=${encodeURIComponent(storedRetryData.value.apiKey.trim())}`
    }

    if (storedRetryData.value.additionalContext.trim()) {
      apiUrl += `&additionalContext=${encodeURIComponent(storedRetryData.value.additionalContext.trim())}`
    }

    if (storedRetryData.value.outputLang !== 'en') {
      apiUrl += `&output_lang=${encodeURIComponent(storedRetryData.value.outputLang)}`
    }

    showResultMessage(`${t('home.retryingRequest')} (${currentRetryCount.value}/${maxRetryCount.value})`, 'info')

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.ok && result.success) {
      // 重試成功，返回新的 taskId
      return result.taskId
    } else {
      // 重試失敗
      showResultMessage(`${t('home.retryFailed')} (${response.status}):\n${JSON.stringify(result, null, 2)}`, 'error')
      return null
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`${t('home.retryError')}:\n${errorMessage}`, 'error')
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
  if (!selectedFile.value) {
    showResultMessage(t('home.selectFileFirst'), 'error')
    return
  }

  // 重置重試計數
  currentRetryCount.value = 0

  // 儲存重試數據
  storeRetryData()

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

    showResultMessage(t('home.sendingRequest'), 'info')

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

      showResultMessage(`${t('home.taskStarted')}\n\n${t('home.taskId')}: ${result.taskId}\n${t('home.status')}: ${result.status}\n${t('home.estimatedTime')}: ${result.estimatedTime}`, 'success')
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
        showResultMessage(`${t('home.retrySuccess')} - 開始輪詢新任務`, 'success')
      } else {
        showResultMessage(`${t('home.allRetriesFailed')}`, 'error')
      }
    } else {
      showResultMessage(`${t('home.requestFailed')} (${response.status}):\n${JSON.stringify(result, null, 2)}`, 'error')
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
        showResultMessage(`${t('home.retrySuccess')} - 開始輪詢新任務`, 'success')
      } else {
        showResultMessage(`${t('home.allRetriesFailed')}`, 'error')
      }
    } else {
      showResultMessage(`${t('home.requestError')}:\n${errorMessage}`, 'error')
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
    }, 60000) // 60秒 = 1分鐘

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

      if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
        pollingInterval.value = null
      }

      // 隱藏任務狀態
      showTaskStatus.value = false

      // 檢查是否啟用了重試機制
      if (retryMode.value !== 'strict' && storedRetryData.value && currentRetryCount.value < maxRetryCount.value) {
        console.log('❌ 輪詢遇到 500 錯誤，開始重試機制')
        showResultMessage(`${t('home.taskFailed')} - ${t('home.retryingRequest')}`, 'info')

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
            showResultMessage(`${t('home.retrySuccess')} - 開始輪詢新任務`, 'success')
            retrySuccess = true
          } else if (retryAttempts < maxRetryCount.value) {
            // 等待 2 秒後再重試
            await new Promise<void>(resolve => setTimeout(resolve, 2000))
          }
        }

        if (!retrySuccess) {
          // 顯示最終錯誤訊息
          const errorHtml = `
            <h2>${t('home.taskFailed')}</h2>
            <div style="margin-bottom: 1em;">
              <p><strong>${t('home.taskId')}:</strong> ${result.taskId || taskId}</p>
              <p><strong>${t('home.status')}:</strong> ${result.status || 'failed'}</p>
              <p><strong>${t('home.failedAt')}:</strong> ${result.failedAt ? new Date(result.failedAt).toLocaleString('zh-TW') : 'N/A'}</p>
            </div>
            <hr style="margin: 1.5em 0; border: none; border-top: 1px solid #ddd;">
            <h3>${t('home.errorDetails')}:</h3>
            <div style="background-color: #fdf2f8; color: #000; padding: 1em; border-radius: 0.5em; border-left: 4px solid #ec4899;">
              <p><strong>${t('home.errorMessage')}:</strong> ${result.message || t('home.unknownError')}</p>
              <p><strong>${t('home.detailedError')}:</strong> ${result.error || t('home.noDetailedError')}</p>
            </div>
            <hr style="margin: 1.5em 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>${t('home.allRetriesFailed')}</strong></p>
          `
          showResultMessage(errorHtml, 'error', true)
        }
      } else {
        // 沒有啟用重試機制，直接顯示錯誤訊息
        const errorHtml = `
          <h2>${t('home.taskFailed')}</h2>
          <div style="margin-bottom: 1em;">
            <p><strong>${t('home.taskId')}:</strong> ${result.taskId || taskId}</p>
            <p><strong>${t('home.status')}:</strong> ${result.status || 'failed'}</p>
            <p><strong>${t('home.failedAt')}:</strong> ${result.failedAt ? new Date(result.failedAt).toLocaleString('zh-TW') : 'N/A'}</p>
          </div>
          <hr style="margin: 1.5em 0; border: none; border-top: 1px solid #ddd;">
          <h3>${t('home.errorDetails')}:</h3>
          <div style="background-color: #fdf2f8; color: #000; padding: 1em; border-radius: 0.5em; border-left: 4px solid #ec4899;">
            <p><strong>${t('home.errorMessage')}:</strong> ${result.message || t('home.unknownError')}</p>
            <p><strong>${t('home.detailedError')}:</strong> ${result.error || t('home.noDetailedError')}</p>
          </div>
        `
        showResultMessage(errorHtml, 'error', true)
      }
    } else {
      // 其他錯誤
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
        pollingInterval.value = null
      }

      showResultMessage(`${t('home.requestFailed')}:\n${JSON.stringify(result, null, 2)}`, 'error')
      showTaskStatus.value = false
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ 輪詢請求錯誤:', errorMessage)

        // 檢查是否啟用了重試機制
    if (retryMode.value !== 'strict' && storedRetryData.value && currentRetryCount.value < maxRetryCount.value) {
      console.log('❌ 輪詢遇到網絡錯誤，開始重試機制')
      showResultMessage(`${t('home.requestError')} - ${t('home.retryingRequest')}`, 'info')

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
          showResultMessage(`${t('home.retrySuccess')} - 開始輪詢新任務`, 'success')
          retrySuccess = true
        } else if (retryAttempts < maxRetryCount.value) {
          // 等待 2 秒後再重試
          await new Promise<void>(resolve => setTimeout(resolve, 2000))
        }
      }

      if (!retrySuccess) {
        showResultMessage(`${t('home.allRetriesFailed')}`, 'error')
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

const downloadMarkdown = async () => {
  try {
    if (!latestSummaryMarkdown.value || latestSummaryMarkdown.value.trim().length === 0) {
      showResultMessage(t('home.noMarkdownContent'), 'error')
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
    showResultMessage(`${t('home.downloadFailed')}: ${errorMessage}`, 'error')
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

// 測試功能
const testLLM = async () => {
  try {
    showResultMessage(t('home.testLLM'), 'info')

    const response = await fetch('https://sensemaker-backend.bestian123.workers.dev/api/test-llm', {
      method: 'POST'
    })

    const result = await response.json()
    if (response.ok && result.success) {
      showResultMessage(`${t('home.testLLMSuccess')}\n\n簡單回應: ${result.simpleResponse}\n\n結構化回應: ${JSON.stringify(result.structuredResponse, null, 2)}\n\n測試評論: ${JSON.stringify(result.testComment, null, 2)}`, 'success')
    } else {
      showResultMessage(`${t('home.testLLMFailed')}:\n${JSON.stringify(result, null, 2)}`, 'error')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`${t('home.testLLMError')}:\n${errorMessage}`, 'error')
  }
}

const testCSV = async () => {
  if (!selectedFile.value) {
    showResultMessage(t('home.testCSV'), 'error')
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
      showResultMessage(`${t('home.testCSVSuccess')}\n\n處理了 ${result.commentsCount} 條評論\n\n詳細結果:\n${JSON.stringify(result, null, 2)}`, 'success')
    } else {
      showResultMessage(`${t('home.testCSVFailed')}:\n${JSON.stringify(result, null, 2)}`, 'error')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`${t('home.requestError')}:\n${errorMessage}`, 'error')
  }
}

const testR2 = async () => {
  try {
    showResultMessage(t('home.testR2'), 'info')

    const response = await fetch('https://sensemaker-backend.bestian123.workers.dev/api/test-r2', {
      method: 'POST'
    })

    const result = await response.json()
    if (response.ok && result.success) {
      showResultMessage(`${t('home.testR2Success')}\n\n讀取的值: ${result.readValue}\n\n自定義元數據: ${JSON.stringify(result.customMetadata, null, 2)}`, 'success')
    } else {
      showResultMessage(`${t('home.testR2Failed')}:\n${JSON.stringify(result, null, 2)}`, 'error')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResultMessage(`${t('home.testR2Error')}:\n${errorMessage}`, 'error')
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
        <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">{{ t('home.title') }}</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label for="apiKey" class="block text-sm font-medium text-gray-700">
              {{ t('home.apiKeyLabel') }} <span class="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              id="apiKey"
              v-model="apiKey"
              :placeholder="t('home.apiKeyPlaceholder')"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
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
              {{ t('home.modelLabel') }}
            </label>
            <input
              type="text"
              id="model"
              v-model="model"
              :placeholder="t('home.modelPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
            <div class="text-xs text-gray-600 space-y-1">
              <p class="italic">{{ t('home.modelNote') }}</p>
              <p class="text-orange-600 font-medium">{{ t('home.costNote') }}</p>
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
            <input
              type="text"
              id="additionalContext"
              v-model="additionalContext"
              :placeholder="t('home.additionalContextPlaceholder')"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
          </div>

          <div class="space-y-2">
            <label for="outputLang" class="block text-sm font-medium text-gray-700">
              {{ t('home.outputLangLabel') }}
            </label>
            <select
              id="outputLang"
              v-model="outputLang"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
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
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
              >
              <p class="text-xs text-gray-600">{{ t('home.customRetryCountNote') }}</p>
            </div>
          </div>

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
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-democratic-red focus:border-democratic-red"
            >
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        <div class="text-center p-3 bg-blue-100 rounded-md">
          <div class="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span class="text-blue-800">{{ pollingMessage }}</span>
        </div>

        <!-- 重試進度顯示 -->
        <div v-if="currentRetryCount > 0" class="text-center p-3 bg-orange-100 rounded-md mt-3">
          <div class="inline-block w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          <span class="text-orange-800">🔄 重試第 {{ currentRetryCount }} 次 (最大 {{ maxRetryCount }} 次)</span>
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
          {{ t('home.downloadMarkdown') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保留一些自定義樣式，如果需要 */
</style>
