<template>
  <div class="csv-uploader">
    <div class="upload-area" @drop="handleDrop" @dragover.prevent @dragenter.prevent>
      <div v-if="!file" class="upload-prompt">
        <div class="upload-icon">📁</div>
        <h3>上傳 CSV 檔案</h3>
        <p>拖拽檔案到此處，或點擊選擇檔案</p>
        <input
          ref="fileInput"
          type="file"
          accept=".csv"
          @change="handleFileSelect"
          style="display: none"
        />
        <button @click="$refs.fileInput.click()" class="select-btn">
          選擇檔案
        </button>
      </div>
      
      <div v-else class="file-info">
        <div class="file-details">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
        </div>
        <button @click="removeFile" class="remove-btn">移除</button>
      </div>
    </div>

    <div v-if="file" class="upload-actions">
      <button @click="analyzeFile" :disabled="isAnalyzing" class="analyze-btn">
        {{ isAnalyzing ? '分析中...' : '開始分析' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  onFileSelect: (file: File) => void
  onAnalyze: (file: File) => Promise<void>
}

const props = defineProps<Props>()

const file = ref<File | null>(null)
const isAnalyzing = ref(false)
const error = ref('')
const fileInput = ref<HTMLInputElement>()

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const selectedFile = target.files[0]
    if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
      file.value = selectedFile
      props.onFileSelect(selectedFile)
      error.value = ''
    } else {
      error.value = '請選擇有效的 CSV 檔案'
    }
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer?.files) {
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
      file.value = droppedFile
      props.onFileSelect(droppedFile)
      error.value = ''
    } else {
      error.value = '請選擇有效的 CSV 檔案'
    }
  }
}

const removeFile = () => {
  file.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const analyzeFile = async () => {
  if (!file.value) return
  
  try {
    isAnalyzing.value = true
    error.value = ''
    await props.onAnalyze(file.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '分析過程中發生錯誤'
  } finally {
    isAnalyzing.value = false
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.csv-uploader {
  max-width: 600px;
  margin: 0 auto;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: border-color 0.3s ease;
  margin-bottom: 1rem;
}

.upload-area:hover {
  border-color: #42b883;
}

.upload-prompt {
  color: #666;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-prompt h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.upload-prompt p {
  margin: 0 0 1rem 0;
}

.select-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.select-btn:hover {
  background: #369870;
}

.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.file-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.file-name {
  font-weight: 500;
  color: #333;
}

.file-size {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.remove-btn:hover {
  background: #c82333;
}

.upload-actions {
  text-align: center;
  margin-bottom: 1rem;
}

.analyze-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}

.analyze-btn:hover:not(:disabled) {
  background: #0056b3;
}

.analyze-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  text-align: center;
  padding: 0.5rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-top: 1rem;
}
</style>
