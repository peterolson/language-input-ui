import type { UserHistory } from '../types/history.types';
import { cachedData } from './cachedData';

const historyCache = cachedData([] as UserHistory, 'history');

export const historyStore = historyCache.store;

export function addViewToHistory(id: string) {
	historyCache.update([
		...historyCache.value,
		{
			id,
			timestamp: new Date(),
			action: 'view'
		}
	]);
}

export function getViewedContentIds(history: UserHistory) {
	return history.filter((h) => h.action === 'view').map((h) => h.id);
}
