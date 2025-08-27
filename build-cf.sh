#!/bin/bash

# Cloudflare Pages 建置腳本
# 使用 yarn 管理依賴，避免平台特定依賴問題

echo "開始 Cloudflare Pages 建置..."

# 設置環境變數
export ROLLUP_SKIP_NATIVE=true
export ROLLUP_NATIVE=false
export NODE_OPTIONS="--max-old-space-size=4096"

# 清理依賴
echo "清理依賴..."
rm -rf node_modules yarn.lock

# 安裝依賴
echo "安裝依賴..."
yarn install

# 建置專案
echo "開始建置..."
yarn build

echo "建置完成！"
