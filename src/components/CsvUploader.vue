<template>
  <div class="max-w-2xl mx-auto">
    <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors duration-200 hover:border-democratic-red mb-4" @drop="handleDrop" @dragover.prevent @dragenter.prevent>
      <div v-if="!file" class="text-gray-600">
        <div class="text-5xl mb-4">📁</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">上傳 CSV 檔案</h3>
        <p class="mb-4">拖拽檔案到此處，或點擊選擇檔案</p>
        <input
          ref="fileInput"
          type="file"
          accept=".csv"
          @change="handleFileSelect"
          class="hidden"
        />
        <button @click="fileInput?.click()" class="bg-jade-green hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors duration-200 font-medium">
          選擇檔案
        </button>
      </div>

      <div v-else class="flex justify-between items-center p-4 bg-gray-50 rounded-md">
        <div class="flex flex-col items-start">
          <span class="font-medium text-gray-800">{{ file.name }}</span>
          <span class="text-sm text-gray-600 mt-1">{{ formatFileSize(file.size) }}</span>
        </div>
        <button @click="removeFile" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm">
          移除
        </button>
      </div>
    </div>

    <div v-if="file" class="text-center mb-4">
      <button @click="analyzeFile" :disabled="isAnalyzing" class="bg-democratic-red hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-md transition-colors duration-200 font-medium text-lg disabled:cursor-not-allowed">
        {{ isAnalyzing ? '分析中...' : '開始分析' }}
      </button>
    </div>

    <div v-if="error" class="text-red-600 text-center p-2 bg-red-50 border border-red-200 rounded-md mt-4">
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
/* 保留一些自定義樣式，如果需要 */
</style>
