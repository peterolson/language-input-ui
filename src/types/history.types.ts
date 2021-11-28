export type UserHistory = HistoryItem[];

export type HistoryAction = 'view' | 'import';

export type HistoryItem = {
	id: string;
	timestamp: Date;
	action: HistoryAction;
};
