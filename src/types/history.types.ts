export type UserHistory = HistoryItem[];

export type HistoryAction = 'view';

export type HistoryItem = {
	id: string;
	timestamp: Date;
	action: HistoryAction;
};
