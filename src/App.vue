<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Footer from './components/Footer.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const mobileMenuOpen = ref(false)
const route = useRoute()
const { t } = useI18n()

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 監聽路由變化，自動捲到頁面最上方
watch(() => route.path, () => {
  // 立即滾動到頁面最上方，讓視覺焦點立即進入主題
  // 使用 window.scrollTo(0, 0) 確保立即滾動，不等待動畫
  window.scrollTo(0, 0)

  // 關閉手機版選單
  mobileMenuOpen.value = false
})
</script>

<template>
  <header id="navbar" class="bg-black text-white sticky top-0 z-10">
    <div class="w-full px-4 md:mx-auto">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="flex items-center">
          <span class="ml-2 text-xl font-bold">{{ t('home.title') }}</span>
        </router-link>

        <div class="hidden lg:flex items-center space-x-1 md:space-x-2 lg:space-x-6 xl:space-x-10">
          <router-link
            to="/"
            class="hover:text-democratic-red transition flex items-center gap-1"
            :class="{ 'text-democratic-red': $route.path === '/' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6.643 7.74195L11.578 5.22295C12.1571 4.92568 12.8439 4.92568 13.423 5.22295L18.358 7.74195C19.136 8.21167 19.57 9.0907 19.47 9.99395L19.5 14.9999C19.5 17.2091 17.7091 18.9999 15.5 18.9999H9.5C7.29086 18.9999 5.5 17.2091 5.5 14.9999L5.531 9.99995C5.42854 9.09464 5.86291 8.21262 6.643 7.74195Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.168 18.9999V16.6659C10.168 15.3769 11.213 14.3319 12.502 14.3319C13.7911 14.3319 14.836 15.3769 14.836 16.6659V18.9999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ t('common.home') }}</span>
          </router-link>
          <router-link
            to="/about"
            class="hover:text-democratic-red transition flex items-center gap-1"
            :class="{ 'text-democratic-red': $route.path === '/about' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ t('common.about') }}</span>
          </router-link>
          <router-link
            to="/privacy"
            class="hover:text-democratic-red transition flex items-center gap-1"
            :class="{ 'text-democratic-red': $route.path === '/privacy' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>{{ t('common.privacy') }}</span>
          </router-link>
          <router-link
            to="/maintain"
            class="hover:text-democratic-red transition flex items-center gap-1"
            :class="{ 'text-democratic-red': $route.path === '/maintain' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ t('common.maintain') }}</span>
          </router-link>
          <router-link
            to="/self-host"
            class="hover:text-democratic-red transition flex items-center gap-1"
            :class="{ 'text-democratic-red': $route.path === '/self-host' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{{ t('common.selfHost') }}</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-2">
          <!-- 語言切換器 -->
          <LanguageSwitcher />
          <button @click="toggleMobileMenu" class="lg:hidden text-white hover:text-democratic-red transition" title="Menu" name="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 手機版導航選單 -->
    <div v-show="mobileMenuOpen" class="lg:hidden bg-black border-t border-gray-700">
      <div class="w-full px-4 py-3">
        <router-link
          to="/"
          class="flex items-center gap-2 py-2 hover:text-democratic-red transition"
          :class="{ 'text-democratic-red': $route.path === '/' }"
          @click="mobileMenuOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
          </svg>
          <span>{{ t('common.home') }}</span>
        </router-link>
        <router-link
          to="/about"
          class="flex items-center gap-2 py-2 hover:text-democratic-red transition"
          :class="{ 'text-democratic-red': $route.path === '/about' }"
          @click="mobileMenuOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ t('common.about') }}</span>
        </router-link>
        <router-link
          to="/privacy"
          class="flex items-center gap-2 py-2 hover:text-democratic-red transition"
          :class="{ 'text-democratic-red': $route.path === '/privacy' }"
          @click="mobileMenuOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>{{ t('common.privacy') }}</span>
        </router-link>
        <router-link
          to="/maintain"
          class="flex items-center gap-2 py-2 hover:text-democratic-red transition"
          :class="{ 'text-democratic-red': $route.path === '/maintain' }"
          @click="mobileMenuOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{{ t('common.maintain') }}</span>
        </router-link>
        <router-link
          to="/self-host"
          class="flex items-center gap-2 py-2 hover:text-democratic-red transition"
          :class="{ 'text-democratic-red': $route.path === '/self-host' }"
          @click="mobileMenuOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{{ t('common.selfHost') }}</span>
        </router-link>
      </div>
    </div>
  </header>

  <main class="min-h-screen">
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped>
/* Header styles */
#navbar {
  z-index: 999;
}
</style>
