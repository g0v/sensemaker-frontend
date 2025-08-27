<template>
  <div class="about">
    <div class="container">
      <h1>🚀 關於 Sensemaker 意見綜整器</h1>

      <div class="section">
        <h2>📖 什麼是 Sensemaker？</h2>
        <p>
          <strong>Sensemaker 意見綜整器</strong> 是一個強大的 AI 驅動工具，專門用於分析大量意見數據並產生有意義的洞察。
          它能夠識別主要共同點和意見分歧，幫助您從海量數據中提取有價值的資訊。
        </p>
        <p>
          這個工具特別適用於審議民主場景，當您使用 <strong>Polis 城邦</strong> 等非同步意見徵集工具時，
          可以幫助處理大量相似或重複的意見，自動生成結構化的分析報告。
        </p>
      </div>

      <div class="section">
        <h2>🔗 相關資源</h2>
        <ul>
          <li><strong>官方說明文：</strong><a href="https://jigsaw-code.github.io/sensemaking-tools/" target="_blank">https://jigsaw-code.github.io/sensemaking-tools/</a></li>
          <li><strong>開源程式庫：</strong><a href="https://github.com/Jigsaw-Code/sensemaking-tools/" target="_blank">https://github.com/Jigsaw-Code/sensemaking-tools/</a></li>
          <li><strong>實驗版程式庫(本站相容)：</strong><a href="https://github.com/bestian/sensemaking-tools/" target="_blank">https://github.com/bestian/sensemaking-tools/</a> (請使用 <code>new-feature-open-router</code> 分支)</li>
        </ul>
      </div>

      <div class="section">
        <h2>📊 支持的數據來源</h2>
        <p>本工具支持從以下平台導出的報告數據：</p>

        <div class="platform-info">
          <h3>🌐 <a href="https://pol.is/" target="_blank" rel="noopener noreferrer">Pol.is</a></h3>
          <p>從 Pol.is 報告頁面導出 comments 相關的 CSV 文件，然後使用我們的轉換工具進行格式調整。</p>

          <h3>🇹🇼 <a href="https://polis.tw/" target="_blank" rel="noopener noreferrer">Polis.tw</a></h3>
          <p>從 Polis.tw 的報告頁面獲取數據，需要通過開發者模式提取 API 回應的 JSON 數據，然後轉換為正確的 CSV 格式。</p>

          <!-- <h3>🏛️ <a href="https://agoracitizen.network/" target="_blank" rel="noopener noreferrer">Agora Citizen</a></h3>
          <p>支持 Agora Citizen 平台導出的意見數據，同樣需要轉換為標準格式。</p> -->
        </div>
      </div>

      <div class="section">
        <h2>📋 數據格式要求</h2>

        <p>
          必要欄位：comment-id, comment_text, agrees, disagrees, passes, votes
        </p>

        <p>
          為了確保分析效果，您的數據需要符合以下格式：
        </p>

        <h3>CSV 格式</h3>
        <pre><code>comment-id,comment_text,agrees,disagrees,passes,votes
comment-1,這個產品真的很棒使用起來非常方便,15,2,1,18
comment-2,界面設計很美觀功能也很實用,12,1,0,13</code></pre>
      </div>

      <div class="section">
        <h2>🔄 數據轉換指南</h2>

        <h3>Polis.tw 數據轉換</h3>
        <ol>
          <li>進入 Polis.tw 的報告頁面，開啟開發者模式</li>
          <li>在「網路」標籤中找到 <code>GET /api/v3/comments</code> 的 API 回應</li>
          <li>將 JSON 數據保存為 <code>polis_report.json</code></li>
          <li>使用 <a href="https://github.com/mrodrig/json-2-csv-cli" target="_blank" rel="noopener noreferrer"><code>json2csv-cli</code></a> 套件將 JSON 轉換為 CSV：<code>json2csv polis_report.json -o comments_raw.csv</code></li>
          <li>使用 <code>csv_converter.py</code> 工具修正 CSV 格式：<code>python3 ./polis_csv_fixer/csv_converter.py ./files/comments_raw.csv ./files/comments.csv</code></li>
        </ol>

        <h3>Pol.is 數據轉換</h3>
        <ol>
          <li>從 Pol.is 報告頁面導出 comments CSV 文件</li>
          <li>重命名為 <code>comments_raw.csv</code></li>
          <li>使用 <code>csv_converter_new.py</code> 工具進行格式轉換：<code>python3 ./polis_csv_fixer/csv_converter_new.py ./files/comments_raw.csv</code></li>
          <li>將轉換後的文件重命名為 <code>comments.csv</code></li>
        </ol>

        <h3>轉換工具使用</h3>
        <p>我們提供了自動化的轉換工具來處理不同格式的數據：</p>
        <ul>
          <li><strong>CSV 轉 JSON：</strong> 使用 <code>csv2json</code> 套件進行格式轉換</li>
          <li><strong>Polis.tw 數據處理：</strong> 使用 <code>csv_converter.py</code> 處理已轉換的 CSV 格式</li>
          <li><strong>Pol.is 數據處理：</strong> 使用 <code>csv_converter_new.py</code> 處理導出的 CSV 文件</li>
          <li><strong>自動化處理：</strong> 支持批量轉換和格式驗證</li>
        </ul>
      </div>

      <div class="section">
        <h2>🎯 使用場景</h2>
        <p>Sensemaker 特別適用於以下場景：</p>
        <ul>
          <li><strong>審議民主：</strong> 處理大量公民意見，識別共識和分歧點</li>
          <li><strong>政策制定：</strong> 分析公眾對特定政策的意見分布</li>
          <li><strong>產品開發：</strong> 整理用戶反饋，識別主要需求和改進點</li>
          <li><strong>學術研究：</strong> 分析問卷調查或訪談數據</li>
          <li><strong>社群管理：</strong> 理解社群成員的意見和需求</li>
        </ul>
      </div>

      <div class="section">
        <h2>💡 使用建議</h2>
        <ul>
          <li>確保數據質量，移除重複或無效的意見</li>
          <li>提供清晰的上下文描述，幫助 AI 更好地理解數據背景</li>
          <li>根據分析目的選擇合適的輸出格式（推薦使用 Markdown 格式）</li>
          <li>定期檢查和更新數據，確保分析結果的時效性</li>
        </ul>
      </div>

      <div class="section">
        <h2>🚀 開始使用</h2>
        <p>準備好您的數據了嗎？前往 <router-link to="/" class="home-link">首頁</router-link> 開始上傳和分析您的意見數據！</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.section h3 {
  color: #34495e;
  margin: 1.5rem 0 1rem 0;
}

.section p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #555;
}

.section ul, .section ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

.section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.platform-info {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  margin: 1rem 0;
}

.platform-info h3 {
  color: #2980b9;
  margin-top: 0;
}

pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  border: 1px solid #e9ecef;
  font-size: 0.9rem;
  line-height: 1.4;
}

code {
  background-color: #f1f2f6;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.home-link {
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  margin-top: 1rem;
}

.home-link:hover {
  background-color: #2980b9;
  text-decoration: none;
}

@media (max-width: 768px) {
  .about {
    padding: 1rem 0.5rem;
  }

  .section {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  pre {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
}
</style>
