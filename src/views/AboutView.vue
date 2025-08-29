<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">🚀 關於 Sensemaker 意見綜整器</h1>
        <p class="text-center text-gray-600 text-sm italic mb-8">
          <em>About Sensemaker Opinion Integration Tool</em>
        </p>

        <div class="space-y-8">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">📖 什麼是 Sensemaker？</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              <strong>Sensemaker 意見綜整器</strong> 是一個強大的 AI 驅動工具，專門用於分析大量意見數據並產生有意義的洞察。
              它能夠識別主要共同點和意見分歧，幫助您從海量數據中提取有價值的資訊。
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              這個工具特別適用於審議民主場景，當您使用 <strong>Polis 城邦</strong> 等非同步意見徵集工具時，
              可以幫助處理大量相似或重複的意見，自動生成結構化的分析報告。
            </p>
            <p class="text-gray-600 text-xs italic">
              <em><strong>Sensemaker Opinion Integration Tool</strong> is a powerful AI-driven tool specifically designed for analyzing large volumes of opinion data and generating meaningful insights. It can identify major commonalities and opinion divergences, helping you extract valuable information from massive datasets.</em>
            </p>
            <p class="text-gray-600 text-xs italic">
              <em>This tool is particularly suitable for deliberative democracy scenarios. When you use asynchronous opinion collection tools like <strong>Polis</strong>, it can help process large amounts of similar or repetitive opinions and automatically generate structured analysis reports.</em>
            </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🔗 相關資源</h2>
            <p class="text-gray-600 text-xs italic mb-3">
              <em>Related Resources</em>
            </p>
            <ul class="space-y-2 text-gray-700">
              <li><strong>官方說明文：</strong><a href="https://jigsaw-code.github.io/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://jigsaw-code.github.io/sensemaking-tools/</a></li>
              <li><strong>開源程式庫：</strong><a href="https://github.com/Jigsaw-Code/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://github.com/Jigsaw-Code/sensemaking-tools/</a></li>
              <li><strong>實驗版程式庫(本站相容)：</strong><a href="https://github.com/bestian/sensemaking-tools/" target="_blank" class="text-democratic-red hover:underline">https://github.com/bestian/sensemaking-tools/</a> (請使用 <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">new-feature-open-router</code> 分支)</li>
            </ul>
            <p class="text-gray-600 text-xs italic mt-2">
              <em>Official Documentation, Open Source Library, and Experimental Version (compatible with this site)</em>
            </p>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">📊 支持的數據來源</h2>
            <p class="text-gray-700 mb-4">本工具支持從以下平台導出的報告數據：</p>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Supported Data Sources: This tool supports report data exported from the following platforms</em>
            </p>

            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">

              <h3 class="text-xl font-semibold text-blue-900 mb-3 mt-6">🇹🇼 <a href="https://polis.tw/" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">Polis.tw</a></h3>
              <p class="text-blue-800">從 Polis.tw 的報告頁面獲取數據，需要通過開發者模式提取 API 回應的 JSON 數據。請參考<a href="https://g0v.hackmd.io/6mzxQkY3Sr6ILYSfSMsqVg" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">這篇教學</a>中的相關說明。</p>
              <p class="text-blue-700 text-xs italic mt-2">
                <em>Get data from Polis.tw report pages, requires extracting JSON data from API responses through developer mode. Please refer to the relevant instructions in <a href="https://g0v.hackmd.io/6mzxQkY3Sr6ILYSfSMsqVg" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">this tutorial</a>.</em>
              </p>

              <h3 class="text-xl font-semibold text-blue-900 mb-3">🌐 <a href="https://pol.is/" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">Pol.is</a></h3>
              <p class="text-blue-800">從 Pol.is 報告頁面導出 comments 相關的 CSV 文件，然後使用我們的轉換工具進行格式調整。請參考<a href="https://g0v.hackmd.io/6mzxQkY3Sr6ILYSfSMsqVg" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">這篇教學</a>中的相關說明。</p>
              <p class="text-blue-700 text-xs italic mt-2">
                <em>Export comments-related CSV files from Pol.is report pages, then use our conversion tool for format adjustment. Please refer to the relevant instructions in <a href="https://g0v.hackmd.io/6mzxQkY3Sr6ILYSfSMsqVg" target="_blank" rel="noopener noreferrer" class="text-democratic-red hover:underline">this tutorial</a>.</em>
              </p>

            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">📋 數據格式要求</h2>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Data Format Requirements</em>
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mb-3">🇹🇼 Polis.tw 數據格式</h3>
            <p class="text-gray-700 mb-4">
              請注意，polis.tw 的數據格式與 Pol.is 不同，目前polis.tw導出的json格式，已經可以被sensemaker直接使用。不需再進行轉換。
            </p>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Note: Polis.tw data format is different from Pol.is. Currently, the JSON format exported by polis.tw can be used directly by sensemaker without further conversion.</em>
            </p>



            <h3 class="text-xl font-semibold text-gray-800 mb-3">🌐 Pol.is 數據格式</h3>
            <p class="text-gray-700 mb-4">
              CSV格式的必要欄位：<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">comment-id, comment_text, agrees, disagrees, passes, votes</code>
            </p>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Required CSV fields: comment-id, comment_text, agrees, disagrees, passes, votes</em>
            </p>

            <p class="text-gray-700 mb-4">
              pol.is的數據格式，為了確保分析效果，您的數據需要轉換，以符合以下格式：
            </p>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>For pol.is data format, to ensure analysis effectiveness, your data needs to be converted to match the following format:</em>
            </p>

            <h3 class="text-xl font-semibold text-gray-800 mb-3">CSV 格式</h3>
            <p class="text-gray-600 text-xs italic mb-2">
              <em>CSV Format</em>
            </p>
            <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>comment-id,comment_text,agrees,disagrees,passes,votes
comment-1,這個產品真的很棒使用起來非常方便,15,2,1,18
comment-2,界面設計很美觀功能也很實用,12,1,0,13</code></pre>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🔄 數據轉換指南</h2>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Data Conversion Guide</em>
            </p>

            <p class="text-gray-700 mb-4">我們提供了自動化的轉換工具來處理不同格式的數據：</p>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>We provide automated conversion tools to handle different data formats:</em>
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Pol.is 數據處理：</strong> 使用 <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">csv_converter_new.py</code> 處理導出的 CSV 文件</li>
              <li><strong>自動化處理：</strong> 支持批量轉換和格式驗證</li>
            </ul>
            <ul class="list-disc list-inside space-y-2 text-gray-600 text-xs italic ml-4">
              <li><em><strong>Pol.is Data Processing:</strong> Use <code class="bg-gray-200 px-1 py-0.5 rounded">csv_converter_new.py</code> to process exported CSV files</em></li>
              <li><em><strong>Automated Processing:</strong> Supports batch conversion and format validation</em></li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🎯 使用場景</h2>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Use Cases</em>
            </p>
            <p class="text-gray-700 mb-4">Sensemaker 特別適用於以下場景：</p>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Sensemaker is particularly suitable for the following scenarios:</em>
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>審議民主：</strong> 處理大量公民意見，識別共識和分歧點</li>
              <li><strong>政策制定：</strong> 分析公眾對特定政策的意見分布</li>
              <li><strong>產品開發：</strong> 整理用戶反饋，識別主要需求和改進點</li>
              <li><strong>學術研究：</strong> 分析問卷調查或訪談數據</li>
              <li><strong>社群管理：</strong> 理解社群成員的意見和需求</li>
            </ul>
            <ul class="list-disc list-inside space-y-2 text-gray-600 text-xs italic ml-4">
              <li><em><strong>Deliberative Democracy:</strong> Process large volumes of citizen opinions, identify consensus and divergence points</em></li>
              <li><em><strong>Policy Making:</strong> Analyze public opinion distribution on specific policies</em></li>
              <li><em><strong>Product Development:</strong> Organize user feedback, identify main needs and improvement points</em></li>
              <li><em><strong>Academic Research:</strong> Analyze questionnaire surveys or interview data</em></li>
              <li><em><strong>Community Management:</strong> Understand community members' opinions and needs</em></li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">💡 使用建議</h2>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Usage Tips</em>
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>確保數據質量，移除重複或無效的意見</li>
              <li>提供清晰的上下文描述，幫助 AI 更好地理解數據背景</li>
              <li>根據分析目的選擇合適的輸出格式（推薦使用 Markdown 格式）</li>
              <li>定期檢查和更新數據，確保分析結果的時效性</li>
            </ul>
            <ul class="list-disc list-inside space-y-2 text-gray-600 text-xs italic ml-4">
              <li><em>Ensure data quality, remove duplicate or invalid opinions</em></li>
              <li><em>Provide clear context descriptions to help AI better understand data background</em></li>
              <li><em>Choose appropriate output format based on analysis purpose (recommended: Markdown format)</em></li>
              <li><em>Regularly check and update data to ensure analysis results are timely</em></li>
            </ul>
          </div>

          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-democratic-red pb-2">🚀 開始使用</h2>
            <p class="text-gray-600 text-xs italic mb-4">
              <em>Get Started</em>
            </p>
            <p class="text-gray-700 mb-4">準備好您的數據了嗎？前往 <router-link to="/" class="inline-block bg-democratic-red hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mt-2">首頁</router-link> 開始上傳和分析您的意見數據！</p>
            <p class="text-gray-600 text-xs italic">
              <em>Ready with your data? Go to the <router-link to="/" class="inline-block bg-democratic-red hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mt-2">Homepage</router-link> to start uploading and analyzing your opinion data!</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保留一些自定義樣式，如果需要 */
</style>
