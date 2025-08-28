/**
 * 轉換CSV資料格式
 * 輸入：原始CSV包含 tid, txt, agree_count, disagree_count, pass_count 等欄位
 * 輸出：轉換後的CSV包含 comment-id, comment_text, votes, agrees, disagrees 等欄位
 */



export interface CSVRow {
[key: string]: string;
}

export interface InputCSVRow extends CSVRow {
  tid: string;
  txt: string;
  agree_count: string;
  disagree_count: string;
  pass_count: string;
  [key: string]: string;
}

export interface OutputCSVRow extends CSVRow {
  'comment-id': string;
  'comment_text': string;
  'votes': string;
  'agrees': string;
  'disagrees': string;
  'passes': string;
  'a-votes': string;
  'a-agree-count': string;
  'a-disagree-count': string;
  'a-pass-count': string;
  'b-votes': string;
  'b-agree-count': string;
  'b-disagree-count': string;
  'b-pass-count': string;
}

/**
 * 轉換CSV資料格式
 * 
 * @param inputRows 輸入的CSV行資料
 * @returns 轉換後的CSV行資料
 */
export function convertCSV(inputRows: InputCSVRow[]): OutputCSVRow[] {
  return inputRows.map(row => {
    // 計算votes (agree_count + disagree_count + pass_count)
    const agreeCount = parseInt(row.agree_count || '0');
    const disagreeCount = parseInt(row.disagree_count || '0');
    const passCount = parseInt(row.pass_count || '0');
    const votes = agreeCount + disagreeCount + passCount;

    // 創建新行資料
    return {
      'comment-id': row.tid || '',
      'comment_text': row.txt || '',
      'votes': votes.toString(),
      'agrees': agreeCount.toString(),
      'disagrees': disagreeCount.toString(),
      'passes': passCount.toString(),
      'a-votes': votes.toString(), // 假設a-votes等於總votes
      'a-agree-count': agreeCount.toString(),
      'a-disagree-count': disagreeCount.toString(),
      'a-pass-count': passCount.toString(),
      'b-votes': '0', // 根據範例，b相關欄位設為0
      'b-agree-count': '0',
      'b-disagree-count': '0',
      'b-pass-count': '0'
    };
  });
}

/**
 * 將 CSV 字串轉換為物件陣列
 */
export function parseCSVString(csvString: string): InputCSVRow[] {
  const lines = csvString.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV 字串至少需要標題行和一行資料');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const rows: InputCSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: InputCSVRow = {
      tid: '',
      txt: '',
      agree_count: '0',
      disagree_count: '0',
      pass_count: '0'
    };
    
    headers.forEach((header, index) => {
      if (header in row) {
        row[header as keyof InputCSVRow] = values[index] || '';
      }
    });
    
    rows.push(row);
  }

  return rows;
}

/**
 * 將物件陣列轉換為 CSV 字串
 */
export function convertToCSVString(rows: OutputCSVRow[]): string {
  if (rows.length === 0) {
    return '';
  }

  const headers = Object.keys(rows[0]);
  const csvLines = [headers.join(',')];

  rows.forEach(row => {
    const values = headers.map(header => {
      const value = row[header as keyof OutputCSVRow] || '';
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

/**
 * 完整的 CSV 轉換流程
 * 
 * @param csvString 輸入的 CSV 字串
 * @returns 轉換後的 CSV 字串
 */
export function processCSV(csvString: string): string {
  try {
    const inputRows = parseCSVString(csvString);
    const outputRows = convertCSV(inputRows);
    return convertToCSVString(outputRows);
  } catch (error) {
    throw new Error(`CSV 轉換失敗: ${error instanceof Error ? error.message : '未知錯誤'}`);
  }
}
