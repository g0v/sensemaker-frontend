/**
 * 修復CSV檔案欄位腳本 (新版，處理pol.is的csv)
 * 自動添加 votes 和 passes 欄位
 * 將 comment-body 重命名為 comment_text
 */

export interface CSVRow {
  [key: string]: string;
}

export interface FixedCSVRow extends CSVRow {
  'comment-id': string;
  'comment_text': string;
  'agrees': string;
  'disagrees': string;
  'passes': string;
  'votes': string;
  'moderated': string;
  [key: string]: string;
}

export interface ConversionResult {
  success: boolean;
  rows?: FixedCSVRow[];
  fieldnames?: string[];
  stats?: {
    totalVotes: number;
    passesCount: number;
    votesRange: { min: number; max: number };
  };
  error?: string;
}

/**
 * 修復CSV資料，添加缺失的欄位
 * 
 * @param rows 輸入的CSV行資料
 * @returns 轉換結果
 */
export function convertCSV_new(rows: CSVRow[]): ConversionResult {
  try {
    if (rows.length === 0) {
      return { success: false, error: '沒有資料行' };
    }

    const fieldnames = Object.keys(rows[0]);
    console.log(`原始欄位: ${fieldnames}`);

    // 檢查必要欄位是否存在
    const requiredColumns = ['agrees', 'disagrees', 'moderated'];
    const missingColumns = requiredColumns.filter(col => !fieldnames.includes(col));

    if (missingColumns.length > 0) {
      return { 
        success: false, 
        error: `缺少必要欄位: ${missingColumns.join(', ')}` 
      };
    }

    console.log(`成功讀取 ${rows.length} 行資料`);

    // 處理欄位重命名：comment-body -> comment_text
    if (fieldnames.includes('comment-body')) {
      console.log('正在重命名欄位: comment-body -> comment_text');
      rows.forEach(row => {
        if ('comment-body' in row) {
          row['comment_text'] = row['comment-body'];
          delete row['comment-body'];
        }
      });
      console.log('欄位重命名完成');
    }

    // 分析 moderated 欄位的值
    const moderatedCounts: Record<string, number> = {};
    rows.forEach(row => {
      const moderatedVal = row['moderated'];
      moderatedCounts[moderatedVal] = (moderatedCounts[moderatedVal] || 0) + 1;
    });

    console.log('moderated 欄位值分佈:');
    Object.entries(moderatedCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([val, count]) => {
        console.log(`  ${val}: ${count}`);
      });

    // 1. 添加 votes 欄位：votes = agrees + disagrees + passes
    console.log('正在計算 votes 欄位...');
    rows.forEach(row => {
      const agrees = parseInt(row['agrees']);
      const disagrees = parseInt(row['disagrees']);
      
      // 先計算 passes，因為 votes 需要包含它
      const moderatedVal = row['moderated'];
      let passes: number;
      
      if (moderatedVal === '1') {
        passes = 0; // 通過的評論沒有 passes
      } else if (moderatedVal === '-1') {
        passes = 0; // 不通過的評論沒有 passes
      } else if (moderatedVal === '0') {
        passes = 1; // 棄權的評論計為 1 pass
      } else {
        passes = 1; // 其他值，假設為棄權
      }

      row['passes'] = passes.toString();
      row['votes'] = (agrees + disagrees + passes).toString();
    });

    // 2. 統計 passes 數量（用於顯示統計資訊）
    console.log('正在統計 passes 數量...');
    const passesCount = rows.filter(row => row['passes'] === '1').length;

    // 將新欄位添加到 fieldnames 中
    const updatedFieldnames = [...fieldnames];
    if (!updatedFieldnames.includes('votes')) {
      updatedFieldnames.push('votes');
    }
    if (!updatedFieldnames.includes('passes')) {
      updatedFieldnames.push('passes');
    }

    console.log(`更新後的欄位: ${updatedFieldnames}`);

    // 計算統計資訊
    const votesValues = rows.map(row => parseInt(row['votes']));
    const totalVotes = votesValues.reduce((sum, votes) => sum + votes, 0) + passesCount;
    const minVotes = Math.min(...votesValues);
    const maxVotes = Math.max(...votesValues);

    console.log('\n欄位統計:');
    console.log(`votes 範圍: ${minVotes} - ${maxVotes}`);
    console.log(`passes 總數: ${passesCount}`);
    console.log(`總投票數 (votes + passes): ${totalVotes}`);

    // 重新排列欄位順序，讓 votes 和 passes 在 agrees/disagrees 附近
    const newFieldnames = [
      'timestamp', 'datetime', 'comment-id', 'author-id',
      'agrees', 'disagrees', 'passes', 'votes', 'moderated', 'comment_text'
    ];

    // 只包含存在的欄位
    const finalFieldnames = newFieldnames.filter(col => updatedFieldnames.includes(col));
    // 添加其他可能存在的欄位
    const otherColumns = updatedFieldnames.filter(col => !finalFieldnames.includes(col));
    finalFieldnames.push(...otherColumns);

    console.log(`最終欄位順序: ${finalFieldnames}`);

    // 顯示前幾行作為驗證
    console.log('\n前5行資料預覽:');
    rows.slice(0, 5).forEach((row, i) => {
      console.log(`行 ${i + 1}: comment-id=${row['comment-id']}, agrees=${row['agrees']}, disagrees=${row['disagrees']}, passes=${row['passes']}, votes=${row['votes']}, moderated=${row['moderated']}`);
      if ('comment_text' in row) {
        const commentPreview = row['comment_text'].length > 50 
          ? row['comment_text'].substring(0, 50) + '...' 
          : row['comment_text'];
        console.log(`      comment_text: ${commentPreview}`);
      }
    });

    return {
      success: true,
      rows: rows as FixedCSVRow[],
      fieldnames: finalFieldnames,
      stats: {
        totalVotes,
        passesCount,
        votesRange: { min: minVotes, max: maxVotes }
      }
    };

  } catch (error) {
    console.error('錯誤:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '未知錯誤' 
    };
  }
}

/**
 * 將 CSV 字串轉換為物件陣列
 */
export function parseCSVString(csvString: string): CSVRow[] {
  const lines = csvString.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV 字串至少需要標題行和一行資料');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: CSVRow = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    rows.push(row);
  }

  return rows;
}

/**
 * 將物件陣列轉換為 CSV 字串
 */
export function convertToCSVString(rows: CSVRow[], fieldnames?: string[]): string {
  if (rows.length === 0) {
    return '';
  }

  const headers = fieldnames || Object.keys(rows[0]);
  const csvLines = [headers.join(',')];

  rows.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      // 如果值包含逗號或引號，則用引號包圍
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvLines.push(values.join(','));
  });

  return csvLines.join('\n');
}
