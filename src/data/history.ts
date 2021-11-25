import { browser } from '$app/env';
import localforage from 'localforage';
import { writable } from 'svelte/store';
import type { UserHistory } from '../types/history.types';

let history: UserHistory = [];
export const historyStore = writable(history);

if (browser) {
	localforage.getItem('history', (err, value) => {
		if (err) {
			return;
		}
		if (value) {
			history = value as UserHistory;
			historyStore.set(history);
		}
	});
}

export function addViewToHistory(id: string) {
	history.push({
		id,
		timestamp: new Date(),
		action: 'view'
	});
	historyStore.set(history);
	localforage.setItem('history', history);
}

export function getViewedContentIds(history: UserHistory) {
	return history.filter((h) => h.action === 'view').map((h) => h.id);
}
