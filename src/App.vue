<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <header id="navbar" class="bg-black text-white sticky top-0 z-10">
    <div class="w-full px-4 md:mx-auto">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="flex items-center">
          <div class="text-2xl font-bold text-democratic-red">🚀</div>
          <span class="ml-2 text-xl font-bold">Sensemaker意見綜整器</span>
        </router-link>

        <div class="hidden lg:flex items-center space-x-1 md:space-x-2 lg:space-x-6 xl:space-x-10">
          <router-link
            to="/"
            class="hover:text-democratic-red transition flex items-center gap-1"
            :class="{ 'text-democratic-red': $route.path === '/' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            <span>首頁</span>
          </router-link>
          <router-link
            to="/about"
            class="hover:text-democratic-red transition flex items-center gap-1"
            :class="{ 'text-democratic-red': $route.path === '/about' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>關於</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-2">
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
          <span>首頁</span>
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
          <span>關於</span>
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

/* 使用 router-link-exact-active class 來標示當前路由 */
.router-link-exact-active {
  color: #D80000 !important; /* democratic-red 顏色 */
}
</style>
