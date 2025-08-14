<template>
  <div class="analysis-results" v-if="summary">
    <div class="results-header">
      <h2>分析結果</h2>
      <div class="download-actions">
        <button @click="downloadMarkdown" class="download-btn markdown">
          下載 Markdown
        </button>
        <button @click="downloadJson" class="download-btn json">
          下載 JSON
        </button>
      </div>
    </div>

    <div class="summary-content">
      <div class="summary-text">
        <h3>摘要</h3>
        <div class="text-content" v-html="formattedSummary"></div>
      </div>

      <div class="summary-stats">
        <h3>統計資訊</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">評論數量</span>
            <span class="stat-value">{{ summary.commentCount || 'N/A' }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">主題數量</span>
            <span class="stat-value">{{ summary.topicCount || 'N/A' }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">摘要類型</span>
            <span class="stat-value">{{ summary.summarizationType || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isDownloading" class="download-status">
      正在準備下載...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Summary {
  text: string
  commentCount?: number
  topicCount?: number
  summarizationType?: string
  [key: string]: any
}

interface Props {
  summary: Summary | null
}

const props = defineProps<Props>()
const isDownloading = ref(false)

const formattedSummary = computed(() => {
  if (!props.summary?.text) return ''
  return props.summary.text.replace(/\n/g, '<br>')
})

const downloadMarkdown = async () => {
  if (!props.summary) return
  
  try {
    isDownloading.value = true
    const content = props.summary.text
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sensemaker-analysis.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } finally {
    isDownloading.value = false
  }
}

const downloadJson = async () => {
  if (!props.summary) return
  
  try {
    isDownloading.value = true
    const content = JSON.stringify(props.summary, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sensemaker-analysis.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } finally {
    isDownloading.value = false
  }
}
</script>

<style scoped>
.analysis-results {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.results-header h2 {
  margin: 0;
  color: #333;
}

.download-actions {
  display: flex;
  gap: 1rem;
}

.download-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.download-btn.markdown {
  background: #28a745;
  color: white;
}

.download-btn.markdown:hover {
  background: #218838;
}

.download-btn.json {
  background: #17a2b8;
  color: white;
}

.download-btn.json:hover {
  background: #138496;
}

.summary-content {
  display: grid;
  gap: 2rem;
}

.summary-text h3,
.summary-stats h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.25rem;
}

.text-content {
  line-height: 1.6;
  color: #555;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 4px solid #42b883;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.stat-label {
  font-weight: 500;
  color: #666;
}

.stat-value {
  font-weight: 600;
  color: #333;
}

.download-status {
  text-align: center;
  padding: 1rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .download-actions {
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
