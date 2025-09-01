<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">{{ t('about.title') }}</h1>

        <div class="space-y-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">{{ t('about.whatIsTitle') }}</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              {{ t('about.whatIsDescription') }}
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              {{ t('about.whatIsDescription2') }}
            </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">{{ t('about.resourcesTitle') }}</h2>
            <ul class="space-y-2 text-gray-700">
              <li><strong>{{ t('about.officialDocs') }}</strong><a href="https://jigsaw-code.github.io/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://jigsaw-code.github.io/sensemaking-tools/</a></li>
              <li><strong>{{ t('about.openSourceLib') }}</strong><a href="https://github.com/Jigsaw-Code/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://github.com/Jigsaw-Code/sensemaking-tools/</a></li>
              <li><strong>{{ t('about.experimentalLib') }}</strong><a href="https://github.com/bestian/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://github.com/bestian/sensemaking-tools/</a> ({{ t('about.experimentalBranch') }})</li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">{{ t('about.supportedDataTitle') }}</h2>
            <p class="text-gray-700 mb-4">{{ t('about.supportedDataDescription') }}</p>

            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 class="text-xl font-semibold text-blue-900 mb-3 mt-6">{{ t('about.polisTWTitle') }}</h3>
              <p class="text-blue-800">{{ t('about.polisTWDescription') }}</p>

              <h3 class="text-xl font-semibold text-blue-900 mb-3">{{ t('about.polisTitle') }}</h3>
              <p class="text-blue-800">{{ t('about.polisDescription') }}</p>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">{{ t('about.dataFormatTitle') }}</h2>

            <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ t('about.polisTWFormatTitle') }}</h3>
            <p class="text-gray-700 mb-4">
              {{ t('about.polisTWFormatDescription') }}
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ t('about.polisFormatTitle') }}</h3>
            <p class="text-gray-700 mb-4">
              {{ t('about.polisFormatDescription') }}
            </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">{{ t('about.useCasesTitle') }}</h2>
            <p class="text-gray-700 mb-4">{{ t('about.useCasesDescription') }}</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>{{ t('about.deliberativeDemocracy') }}</strong></li>
              <li><strong>{{ t('about.policyMaking') }}</strong></li>
              <li><strong>{{ t('about.productDevelopment') }}</strong></li>
              <li><strong>{{ t('about.academicResearch') }}</strong></li>
              <li><strong>{{ t('about.communityManagement') }}</strong></li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">{{ t('about.usageTipsTitle') }}</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>{{ t('about.ensureDataQuality') }}</li>
              <li>{{ t('about.provideContext') }}</li>
              <li>{{ t('about.chooseFormat') }}</li>
              <li>{{ t('about.regularCheck') }}</li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">{{ t('about.getStartedTitle') }}</h2>
            <p class="text-gray-700 mb-4">{{ t('about.readyToStart') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
