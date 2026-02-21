import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.use(router)
app.use(i18n)

// 隨路由切換統一更新頁面標題（含切回首頁）
router.afterEach((to) => {
  const t = i18n.global.t
  const siteName = t('home.title')
  const titles: Record<string, string> = {
    home: siteName,
    about: `${t('about.title')} - ${siteName}`,
    privacy: `${t('privacy.privacyPolicy')} - ${siteName}`,
    maintain: `${t('maintain.pageTitle')} - ${siteName}`,
    'self-host': `${t('selfHost.title')} - ${siteName}`,
    'polis-guide': `${t('polisGuide.title')} - ${siteName}`,
    'openrouter-guide': `${t('openRouterGuide.title')} - ${siteName}`,
    'sensemaker-guide': `${t('sensemakerGuide.title')} - ${siteName}`,
  }
  const title = titles[to.name as string]
  if (title) document.title = title
})

app.mount('#app')
