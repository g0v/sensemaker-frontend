<script setup lang="ts">
import { ref } from 'vue'
import CsvUploader from '@/components/CsvUploader.vue'
import AnalysisResults from '@/components/AnalysisResults.vue'
import { Sensemaker, OpenRouterModel } from 'sensemaking-tools'

interface AnalysisSummary {
  text: string
  commentCount?: number
  topicCount?: number
  summarizationType?: string
}

const isProcessing = ref(false)
const analysisSummary = ref<AnalysisSummary | null>(null)

const handleFileSelect = (file: File) => {
  console.log('Selected file:', file.name)
  // 重置之前的分析結果
  analysisSummary.value = null
}

const handleAnalyze = async (file: File) => {
  try {
    isProcessing.value = true

    // 檢查環境變數
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
    const model = import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'

    if (!apiKey) {
      throw new Error('請設定 VITE_OPENROUTER_API_KEY 環境變數')
    }

    // 讀取 CSV 檔案
    const csvText = await file.text()
    const comments = parseCsvToComments(csvText)

    if (comments.length === 0) {
      throw new Error('CSV 檔案格式不正確或沒有數據')
    }

    // 初始化 Sensemaker
    const openRouterModel = new OpenRouterModel(apiKey, model)

    const sensemaker = new Sensemaker({
      defaultModel: openRouterModel,
      categorizationModel: openRouterModel,
      summarizationModel: openRouterModel
    })

    // 執行分析
    const summary = await sensemaker.summarize(
      comments,
      undefined, // 使用預設摘要類型
      undefined, // 自動學習主題
      '這是一個對話分析任務，請提供清晰的摘要'
    )

    // 處理結果
    analysisSummary.value = {
      text: summary.toString(),
      commentCount: comments.length,
      topicCount: 0, // 暫時設為 0，因為 Summary 類的結構需要進一步確認
      summarizationType: 'AI 自動摘要'
    }

  } catch (error) {
    console.error('Analysis error:', error)
    throw error
  } finally {
    isProcessing.value = false
  }
}

const parseCsvToComments = (csvText: string) => {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim())
  const commentIndex = headers.findIndex(h =>
    h.toLowerCase().includes('comment') ||
    h.toLowerCase().includes('text') ||
    h.toLowerCase().includes('content')
  )

  if (commentIndex === -1) {
    throw new Error('CSV 檔案必須包含 comment、text 或 content 欄位')
  }

  const comments = []
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    if (values[commentIndex] && values[commentIndex].length > 0) {
      comments.push({
        id: i.toString(),
        text: values[commentIndex],
        topics: []
      })
    }
  }

  return comments
}
</script>

<template>
  <div class="home">
    <div class="hero-section">
      <h1>對話分析工具</h1>
      <p>使用 AI 技術分析對話內容，自動生成摘要和洞察</p>
    </div>

    <div class="main-content">
      <CsvUploader
        :onFileSelect="handleFileSelect"
        :onAnalyze="handleAnalyze"
      />

      <div v-if="isProcessing" class="processing-status">
        <div class="spinner"></div>
        <p>正在分析您的對話數據，請稍候...</p>
      </div>

      <AnalysisResults
        v-if="analysisSummary"
        :summary="analysisSummary"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.hero-section {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.processing-status {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.processing-status p {
  font-size: 1.1rem;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section p {
    font-size: 1rem;
  }

  .home {
    padding: 1rem 0.5rem;
  }
}
</style>
