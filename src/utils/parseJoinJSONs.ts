/**
 * Comment 型別（由 sensemaking-tools 內部型別結構手動硬編碼）
 */
export type VoteInfo = {
	agreeCount: number;
	disagreeCount: number;
	passCount: number;
	getTotalCount: (includePass?: boolean) => number;
};

export type Comment = {
	id: string;
	text: string;
	voteInfo?: VoteInfo;
	topics?: string[];
};

type JoinPlatformComment = {
	id?: string | number;
	msgUid?: string | number;
	content?: string;
	oriContent?: string;
	agreeCount?: string | number;
	disagreeCount?: string | number;
	sideType?: string;
};

type JoinPlatformPayload = {
	result?: JoinPlatformComment[];
};

function toNumber(value: unknown): number {
	if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
	if (typeof value === 'string') {
		const parsed = Number.parseInt(value, 10);
		return Number.isFinite(parsed) ? parsed : 0;
	}
	return 0;
}

function isJoinPlatformCommentArray(data: unknown): data is JoinPlatformComment[] {
	return Array.isArray(data);
}

function extractJoinComments(jsonData: unknown): JoinPlatformComment[] {
	if (isJoinPlatformCommentArray(jsonData)) {
		return jsonData;
	}

	if (
		typeof jsonData === 'object' &&
		jsonData !== null &&
		Array.isArray((jsonData as JoinPlatformPayload).result)
	) {
		return (jsonData as JoinPlatformPayload).result as JoinPlatformComment[];
	}

	throw new Error('Invalid Join platform JSON format: expected array or object with result array');
}

function toSensemakerComment(item: JoinPlatformComment, index: number): Comment {
	const agreeCount = toNumber(item.agreeCount);
	const disagreeCount = toNumber(item.disagreeCount);
	const passCount = 0;
	const sideType = typeof item.sideType === 'string' ? item.sideType.toLowerCase() : undefined;

	return {
		id: String(item.msgUid ?? item.id ?? `join-comment-${index}`),
		text: item.content || item.oriContent || '',
		voteInfo: {
			agreeCount,
			disagreeCount,
			passCount,
			getTotalCount: (includePass: boolean = true) =>
				agreeCount + disagreeCount + (includePass ? passCount : 0)
		},
		topics: sideType ? [sideType] : undefined
	};
}

async function parseSingleJSONFile(file: File): Promise<Comment[]> {
	const jsonText = await file.text();
	const jsonData = JSON.parse(jsonText) as unknown;
	const comments = extractJoinComments(jsonData);
	return comments.map(toSensemakerComment);
}

/**
 * 解析 Join 平台 JSON 檔案（可傳單檔或多檔）
 */
export async function parseJSONFile(fileOrFiles: File | File[]): Promise<Comment[]> {
	const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
	const commentsByFile = await Promise.all(files.map((file) => parseSingleJSONFile(file)));
	return commentsByFile.reduce<Comment[]>((allComments, comments) => allComments.concat(comments), []);
}
