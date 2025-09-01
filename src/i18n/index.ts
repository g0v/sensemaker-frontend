import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW'
import zhCN from './locales/zh-CN'
import en from './locales/en'
import ja from './locales/ja'
import fr from './locales/fr'
import es from './locales/es'

export const supportedLocales = [
  { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

export type SupportedLocale = typeof supportedLocales[number]['code']

export const setLocale = (locale: SupportedLocale) => {
  localStorage.setItem('locale', locale)
  window.location.reload()
}

export const getCurrentLocale = (): SupportedLocale => {
  const saved = localStorage.getItem('locale') as SupportedLocale
  if (saved && supportedLocales.some(l => l.code === saved)) {
    return saved
  }
  return 'zh-TW'
}

// 確保所有語言檔案都被正確載入
const messages = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en': en,
  'ja': ja,
  'fr': fr,
  'es': es
}

// 在生產環境中確保 i18n 實例被正確創建
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getCurrentLocale(), // 預設語言
  fallbackLocale: 'en', // 備用語言
  messages,
  // vue-i18n v9 的配置
  globalInjection: true,
  allowComposition: true,
  useScope: 'global',
  // 確保在生產環境中正確工作
  missingWarn: false,
  fallbackWarn: false
})

export default i18n
