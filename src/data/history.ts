import type { UserHistory } from '../types/history.types';
import { cachedData } from './cachedData';
import { objectToArray } from './util';

const historyCache = cachedData([] as UserHistory, 'history');

export const historyStore = historyCache.store;

function addToHistory(id: string, action: 'view' | 'import') {
	historyCache.update([
		...objectToArray(historyCache.value),
		{
			id,
			timestamp: new Date(),
			action
		}
	]);
}

export function addViewToHistory(id: string) {
	addToHistory(id, 'view');
}

export function addImportToHistory(id: string) {
	addToHistory(id, 'import');
}

export function getViewedContentIds(history: UserHistory) {
	return objectToArray(history)
		.filter((h) => h?.action === 'view')
		.map((h) => h.id);
}
