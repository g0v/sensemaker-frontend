<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 class="text-3xl font-bold text-center sm:text-left text-gray-900 mb-2">{{ t('agoraGuide.title') }}</h1>
            <p class="text-center sm:text-left text-gray-500 text-sm">{{ t('agoraGuide.subtitle') }}</p>
            <p class="text-center sm:text-left text-amber-600 text-sm mt-1">{{ t('agoraGuide.mvpNote') }}</p>
          </div>
        </div>

        <!-- 主網站與介紹 -->
        <div class="mb-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-gray-600 mb-2">
            <strong>{{ t('agoraGuide.mainWebsite') }}</strong>
            <a
              href="https://agoracitizen.network/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 ml-1"
            >https://agoracitizen.network/</a>
          </p>
          <p class="text-gray-600">
            <strong>{{ t('agoraGuide.officialVideo') }}</strong>
            <a
              href="https://www.youtube.com/watch?v=1SxIkA96FyA"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 ml-1"
            >{{ t('agoraGuide.youtubeLink') }}</a>
          </p>
        </div>

        <!-- 焦點說明 -->
        <div class="mb-10 p-5 bg-amber-50 border border-amber-200 rounded-lg">
          <h2 class="text-lg font-semibold text-amber-900 mb-2">{{ t('agoraGuide.focusTitle') }}</h2>
          <p class="text-amber-800 text-sm leading-relaxed">
            {{ t('agoraGuide.focusBeforeLink') }}
            <a href="https://github.com/zkorum" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">{{ t('agoraGuide.focusLinkText') }}</a>
            {{ t('agoraGuide.focusAfterLink') }}
            {{ t('agoraGuide.focusSuffix') }}
          </p>
        </div>

        <!-- 步驟 0: Try the MVP -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">0</span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('agoraGuide.step0Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">{{ t('agoraGuide.step0Description') }}</p>
          <div class="ml-14 mb-4">
            <a
              href="https://agoracitizen.network/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('agoraGuide.step0LinkText') }}
            </a>
          </div>
          <div class="ml-14">
            <img
              :src="agoraStartImage"
              :alt="t('agoraGuide.step0Title')"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
        </div>

        <!-- 步驟 1: 註冊帳號 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">1</span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('agoraGuide.step1Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">{{ t('agoraGuide.step1Login') }}</p>
          <div class="ml-14 mb-4">
            <img
              :src="agoraLogin01Image"
              :alt="t('agoraGuide.step1Title')"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-2xl"
            />
          </div>
          <p class="text-gray-600 mb-4 ml-14">{{ t('agoraGuide.step1Register') }}</p>
          <div class="ml-14 mb-4">
            <img
              :src="agoraLogin02Image"
              :alt="t('agoraGuide.step1Register')"
              class="rounded-lg shadow-md border border-gray-200 max-w-[350px]"
            />
          </div>
          <p class="text-gray-600 mb-4 ml-14">{{ t('agoraGuide.step1Next') }}</p>
          <div class="ml-14 mb-4">
            <img
              :src="agoraLogin03Image"
              alt=""
              class="rounded-lg shadow-md border border-gray-200 max-w-[150px]"
            />
          </div>
        </div>

        <!-- 步驟 2: 手機認證 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">2</span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('agoraGuide.step2Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">{{ t('agoraGuide.step2Phone') }}</p>
          <div class="ml-14 mb-4">
            <img
              :src="agoraLoginO4Image"
              :alt="t('agoraGuide.step2Phone')"
              class="rounded-lg shadow-md border border-gray-200 max-w-[200px]"
            />
          </div>
          <p class="text-gray-600 mb-4 ml-14">{{ t('agoraGuide.step2Verify') }}</p>
          <div class="ml-14 mb-4">
            <img
              :src="agoraLogin05Image"
              :alt="t('agoraGuide.step2Title')"
              class="rounded-lg shadow-md border border-gray-200 max-w-[350px]"
            />
          </div>
        </div>

        <!-- 步驟 3: 填基本資料 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">3</span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('agoraGuide.step3Title') }}</h2>
          </div>
          <ul class="text-gray-600 mb-4 ml-14 list-disc list-inside space-y-1">
            <li>{{ t('agoraGuide.step3Bullet1') }}</li>
            <li>{{ t('agoraGuide.step3Bullet2') }}</li>
            <li>{{ t('agoraGuide.step3Bullet3') }}</li>
          </ul>
        </div>

        <!-- 步驟 4: 參與議題 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">4</span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('agoraGuide.step4Title') }}</h2>
          </div>
          <p class="text-gray-600 mb-4 ml-14">{{ t('agoraGuide.step4Enter') }}</p>
          <div class="ml-14 mb-6">
            <img
              :src="agoraUsecase01Image"
              :alt="t('agoraGuide.step4Enter')"
              class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
            />
          </div>
          <p class="text-gray-600 mb-2 ml-14">
            {{ t('agoraGuide.step4ScrollBefore') }}
            <a href="https://translate.google.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">{{ t('agoraGuide.step4ScrollLink') }}</a>
            {{ t('agoraGuide.step4ScrollAfter') }}
          </p>

          <div class="ml-14 mt-6 pl-4 border-l-4 border-blue-200">
            <h3 class="font-semibold text-gray-800 mb-2">{{ t('agoraGuide.voteTitle') }}</h3>
            <p class="text-gray-600 mb-2">{{ t('agoraGuide.voteDescription') }}</p>
          </div>

          <div class="ml-14 mt-6 pl-4 border-l-4 border-blue-200">
            <h3 class="font-semibold text-gray-800 mb-2">{{ t('agoraGuide.reportTitle') }}</h3>
            <p class="text-gray-600 mb-2">{{ t('agoraGuide.reportTabsDesc') }}</p>
            <div class="mb-4">
              <img
                :src="agornUsecase03Image"
                :alt="t('agoraGuide.reportTitle')"
                class="rounded-lg shadow-md border border-gray-200 w-full max-w-2xl"
              />
            </div>
            <p class="text-gray-600 mb-2">{{ t('agoraGuide.reportFourDimensions') }}</p>
            <ul class="text-gray-600 text-sm space-y-1 list-disc list-inside mb-4">
              <li><strong>{{ t('agoraGuide.reportSummary') }}</strong>：{{ t('agoraGuide.reportSummaryDesc') }}</li>
              <li><strong>{{ t('agoraGuide.reportCommon') }}</strong>：{{ t('agoraGuide.reportCommonDesc') }}</li>
              <li><strong>{{ t('agoraGuide.reportDivergence') }}</strong>：{{ t('agoraGuide.reportDivergenceDesc') }}</li>
              <li><strong>{{ t('agoraGuide.reportGroups') }}</strong>：{{ t('agoraGuide.reportGroupsDesc') }}</li>
            </ul>
            <div class="space-y-4">
              <img
                :src="agoraUsecase04Image"
                :alt="t('agoraGuide.reportTitle')"
                class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
              />
              <img
                :src="agoraUasecase02Image"
                :alt="t('agoraGuide.reportGroups')"
                class="rounded-lg shadow-md border border-gray-200 w-full max-w-4xl"
              />
            </div>
          </div>

          <div class="ml-14 mt-6 pl-4 border-l-4 border-green-200">
            <h3 class="font-semibold text-gray-800 mb-2">{{ t('agoraGuide.publishTitle') }}</h3>
            <p class="text-gray-600">{{ t('agoraGuide.publishDescription') }}</p>
          </div>
        </div>

        <!-- 步驟 5: 發起議題 -->
        <div class="mb-12">
          <div class="flex items-center mb-4">
            <span class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg mr-4">5</span>
            <h2 class="text-2xl font-semibold text-gray-800">{{ t('agoraGuide.step5Title') }}</h2>
          </div>
          <p class="text-gray-600 ml-14">{{ t('agoraGuide.step5Description') }}</p>
        </div>

        <!-- Agora 字源 -->
        <div class="mb-10 p-5 bg-slate-50 border border-slate-200 rounded-lg">
          <h2 class="text-lg font-semibold text-slate-800 mb-2">{{ t('agoraGuide.etymologyTitle') }}</h2>
          <p class="text-slate-700 text-sm leading-relaxed">
            {{ t('agoraGuide.etymologyBefore') }}
            <a href="https://en.wikipedia.org/wiki/Agora?wprov=sfti1#Ancient_Agora_of_Athens" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">{{ t('agoraGuide.etymologyLink') }}</a>
            {{ t('agoraGuide.etymologyAfter') }}
          </p>
        </div>

        <!-- 支援與回報 -->
        <div class="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div class="flex items-start">
            <svg class="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 7a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-blue-900 mb-2">{{ t('agoraGuide.supportTitle') }}</h3>
              <ul class="text-blue-800 space-y-1 text-sm">
                <li>
                  {{ t('agoraGuide.supportDiscussionLabel') }}
                  <a href="https://g0v-tw.slack.com/archives/C2Q1M4N1J" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">{{ t('agoraGuide.supportDiscussionLinkText') }}</a>
                </li>
                <li>
                  {{ t('agoraGuide.supportIssuesLabel') }}
                  <a href="https://github.com/zkorum/agora/issues" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">{{ t('agoraGuide.supportIssuesLinkText') }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 底部導航 -->
        <div class="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <router-link
            to="/"
            class="inline-flex md:absolute mx-auto left-0 right-0 w-fit items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {{ t('agoraGuide.backToHome') }}
          </router-link>
          <router-link
            to="/guide/openrouter"
            class="group inline-flex items-center gap-1 md:ml-auto text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {{ t('agoraGuide.nextGuide') }}
            <IconArrowNext class="w-4 stroke-blue-600 group-hover:stroke-blue-800" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import agoraStartImage from '@/assets/screenshots_agora/Agora_start.png?url'
import agoraLogin01Image from '@/assets/screenshots_agora/Agora_Login_01.png?url'
import agoraLogin02Image from '@/assets/screenshots_agora/Agora_Login_02.png?url'
import agoraLogin03Image from '@/assets/screenshots_agora/Agora_Login_03.png?url'
import agoraLoginO4Image from '@/assets/screenshots_agora/Agora_Login_O4.png?url'
import agoraLogin05Image from '@/assets/screenshots_agora/Agora_Login_05.png?url'
import agoraUsecase01Image from '@/assets/screenshots_agora/Agora_Usecase_01.png?url'
import agornUsecase03Image from '@/assets/screenshots_agora/Agorn_Usecase_03.png?url'
import agoraUsecase04Image from '@/assets/screenshots_agora/Agora_Usecase_04.png?url'
import agoraUasecase02Image from '@/assets/screenshots_agora/Agora_Uasecase_02.png?url'
import IconArrowNext from '@/components/icons/IconArrowNext.vue'

const { t } = useI18n()
</script>

<style scoped>
/* 自訂樣式 */
</style>
