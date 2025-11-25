# sensemaker-frontend

## 📖 專案簡介 / Project Introduction

Sensemaker 意見綜整器是一個強大的 AI 驅動工具，專門用於分析大量意見數據並產生有意義的洞察。它能夠識別主要共同點和意見分歧，幫助您從海量數據中提取有價值的資訊。

Sensemaker Opinion Integration Tool is a powerful AI-driven tool specifically designed for analyzing large volumes of opinion data and generating meaningful insights. It can identify major commonalities and opinion divergences, helping you extract valuable information from massive datasets.

這個工具特別適用於審議民主場景，當您使用 Polis 城邦等非同步意見徵集工具時，可以幫助處理大量相似或重複的意見，自動生成結構化的分析報告。本專案為 Sensemaker 部分功能的前端實現，會串接到後端分析工具。前端使用 Vue 3 + Vite 構建。

This tool is particularly suitable for deliberative democracy scenarios. When you use asynchronous opinion collection tools like Polis, it can help process large amounts of similar or repetitive opinions and automatically generate structured analysis reports. This project is a frontend implementation of some Sensemaker features, which connects to backend analysis tools. The frontend is built with Vue 3 + Vite.

* [使用說明 / Usage Guide](https://g0v.hackmd.io/vjYMEjYqRmGfYc0hScQkWg?view)

## 🛠️ 技術棧

- **框架**: Vue 3
- **建置工具**: Vite
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **國際化**: vue-i18n
- **後端專案網址**：https://github.com/bestian/sensemaker-backend
- **核心工具網址**：https://github.com/bestian/sensemaking-tools (forked from https://github.com/Jigsaw-Code/sensemaking-tools)

## Prerequisites

**重要提示：本專案需使用 Yarn ^4 以上版本作為套件管理工具。如使用 `npm install` 創建 `package-lock.json` 會導致自動部署故障。**

### Install Yarn

Run the following command to install Yarn globally using npm:

```bash
npm install -g yarn
```

### Verify the installation

Check the installed version to confirm that Yarn 4 is installed:

```bash
yarn --version
```

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Preview Production Version

step 1. 
```sh
yarn build
```

step 2.
```sh
yarn preview
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
