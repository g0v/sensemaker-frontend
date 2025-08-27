#!/bin/bash

# Cloudflare Pages 建置腳本
# 強制使用純 JavaScript 版本，避免平台特定依賴問題

echo "開始 Cloudflare Pages 建置..."

# 設置環境變數
export ROLLUP_SKIP_NATIVE=true
export ROLLUP_NATIVE=false
export NODE_OPTIONS="--max-old-space-size=4096"

# 清理依賴
echo "清理依賴..."
rm -rf node_modules package-lock.json

# 安裝依賴，排除可選依賴
echo "安裝依賴..."
npm install --omit=optional --ignore-scripts

# 強制移除平台特定的 Rollup 依賴
echo "移除平台特定依賴..."
find node_modules -name "@rollup/rollup-*" -type d -exec rm -rf {} + 2>/dev/null || true

# 建置專案
echo "開始建置..."
npm run build

echo "建置完成！"
