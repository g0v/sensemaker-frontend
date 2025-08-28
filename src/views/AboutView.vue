<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">🚀 關於 Sensemaker 意見綜整器</h1>

        <div class="space-y-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">📖 什麼是 Sensemaker？</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              <strong>Sensemaker 意見綜整器</strong> 是一個強大的 AI 驅動工具，專門用於分析大量意見數據並產生有意義的洞察。
              它能夠識別主要共同點和意見分歧，幫助您從海量數據中提取有價值的資訊。
            </p>
            <p class="text-gray-700 leading-relaxed">
              這個工具特別適用於審議民主場景，當您使用 <strong>Polis 城邦</strong> 等非同步意見徵集工具時，
              可以幫助處理大量相似或重複的意見，自動生成結構化的分析報告。
            </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🔗 相關資源</h2>
            <ul class="space-y-2 text-gray-700">
              <li><strong>官方說明文：</strong><a href="https://jigsaw-code.github.io/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://jigsaw-code.github.io/sensemaking-tools/</a></li>
              <li><strong>開源程式庫：</strong><a href="https://github.com/Jigsaw-Code/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://github.com/Jigsaw-Code/sensemaking-tools/</a></li>
              <li><strong>實驗版程式庫(本站相容)：</strong><a href="https://github.com/bestian/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://github.com/bestian/sensemaking-tools/</a> (請使用 <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">new-feature-open-router</code> 分支)</li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">📊 支持的數據來源</h2>
            <p class="text-gray-700 mb-4">本工具支持從以下平台導出的報告數據：</p>

            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">

              <h3 class="text-xl font-semibold text-blue-900 mb-3 mt-6">🇹🇼 <a href="https://polis.tw/" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">Polis.tw</a></h3>
              <p class="text-blue-800">從 Polis.tw 的報告頁面獲取數據，需要通過開發者模式提取 API 回應的 JSON 數據。請參考<a href="https://g0v.hackmd.io/6mzxQkY3Sr6ILYSfSMsqVg" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">這篇教學</a>中的相關說明。</p>

              <h3 class="text-xl font-semibold text-blue-900 mb-3">🌐 <a href="https://pol.is/" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">Pol.is</a></h3>
              <p class="text-blue-800">從 Pol.is 報告頁面導出 comments 相關的 CSV 文件，然後使用我們的轉換工具進行格式調整。請參考<a href="https://g0v.hackmd.io/6mzxQkY3Sr6ILYSfSMsqVg" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">這篇教學</a>中的相關說明。</p>

            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">📋 數據格式要求</h2>


            <h3 class="text-xl font-semibold text-gray-800 mb-3">🇹🇼Polis.tw 數據格式</h3>
            <p class="text-gray-700 mb-4">
              請注意，polis.tw 的數據格式與 Pol.is 不同，目前polis.tw導出的json格式，已經可以被sensemaker直接使用。不需再進行轉換。
            </p>



            <h3 class="text-xl font-semibold text-gray-800 mb-3">🌐 Pol.is 數據格式</h3>


            <p class="text-gray-700 mb-4">
              CSV格式的必要欄位：<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">comment-id, comment_text, agrees, disagrees, passes, votes</code>
            </p>

            <p class="text-gray-700 mb-4">
              pol.is的數據格式，為了確保分析效果，您的數據需要轉換，以符合以下格式：
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mb-3">CSV 格式</h3>
            <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>comment-id,comment_text,agrees,disagrees,passes,votes
comment-1,這個產品真的很棒使用起來非常方便,15,2,1,18
comment-2,界面設計很美觀功能也很實用,12,1,0,13</code></pre>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🔄 數據轉換指南</h2>

            <p class="text-gray-700 mb-4">我們提供了自動化的轉換工具來處理不同格式的數據：</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Pol.is 數據處理：</strong> 使用 <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">csv_converter_new.py</code> 處理導出的 CSV 文件</li>
              <li><strong>自動化處理：</strong> 支持批量轉換和格式驗證</li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🎯 使用場景</h2>
            <p class="text-gray-700 mb-4">Sensemaker 特別適用於以下場景：</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>審議民主：</strong> 處理大量公民意見，識別共識和分歧點</li>
              <li><strong>政策制定：</strong> 分析公眾對特定政策的意見分布</li>
              <li><strong>產品開發：</strong> 整理用戶反饋，識別主要需求和改進點</li>
              <li><strong>學術研究：</strong> 分析問卷調查或訪談數據</li>
              <li><strong>社群管理：</strong> 理解社群成員的意見和需求</li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">💡 使用建議</h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>確保數據質量，移除重複或無效的意見</li>
              <li>提供清晰的上下文描述，幫助 AI 更好地理解數據背景</li>
              <li>根據分析目的選擇合適的輸出格式（推薦使用 Markdown 格式）</li>
              <li>定期檢查和更新數據，確保分析結果的時效性</li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🚀 開始使用</h2>
            <p class="text-gray-700 mb-4">準備好您的數據了嗎？前往 <router-link to="/" class="inline-block bg-democratic-red hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mt-2">首頁</router-link> 開始上傳和分析您的意見數據！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保留一些自定義樣式，如果需要 */
</style>
