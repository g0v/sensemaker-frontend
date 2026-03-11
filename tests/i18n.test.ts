import { describe, expect, it, beforeEach, vi } from 'vitest'

import { getCurrentLocale } from '@/i18n'

describe('i18n locale selection', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('defaults to zh-TW when nothing is saved', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['xx'],
      configurable: true,
    })

    expect(getCurrentLocale()).toBe('zh-TW')
  })

  it('uses saved locale when valid', () => {
    localStorage.setItem('locale', 'en')
    expect(getCurrentLocale()).toBe('en')
  })

  it('maps generic zh to zh-CN', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['zh'],
      configurable: true,
    })

    expect(getCurrentLocale()).toBe('zh-CN')
  })
})

