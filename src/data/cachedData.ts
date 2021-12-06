/* eslint-disable @typescript-eslint/no-explicit-any */
import { browser } from '$app/env';
import localforage from 'localforage';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { endpoint } from './endpoint';
import { getSession, isLoggedIn, onSessionReady } from './session';

export type CachedData<T> = {
	value: T;
	store: Writable<T>;
	update: (value: T) => void;
};

export function cachedData<T>(defaultValue: T, storageKey: string): CachedData<T> {
	const cachedData = {
		value: defaultValue,
		store: writable<T>(defaultValue),
		update: (value: T) => {
			const prevValue = cachedData.value;
			cachedData.value = value;
			cachedData.store.set(value);
			localforage.setItem(storageKey, value);
			if (isLoggedIn()) {
				const diff = getDiff(storageKey, prevValue, value);
				scheduleCommit(diff);
			}
		}
	};
	if (browser) {
		onSessionReady((session) => {
			localforage.getItem(storageKey, (err, value: any) => {
				if (session.user) {
					if (value && !(storageKey in ((session?.userData as object) || {}))) {
						// populate userData with cached value if userData doesn't have it
						cachedData.value = value;
						cachedData.store.set(value);
						scheduleCommit({
							[`${storageKey}`]: value
						});
						return;
					}
					const userDataValue: any = session?.userData?.[storageKey];
					if (userDataValue) {
						cachedData.value = userDataValue as T;
						cachedData.store.set(userDataValue as T);
						localforage.setItem(storageKey, userDataValue);
						return;
					}
				}
				if (err) {
					return;
				}
				if (value) {
					cachedData.value = value as T;
					cachedData.store.set(value as T);
				}
			});
		});
	}

	return cachedData;
}

let diffToCommit: Record<string, any> = {};
let timeoutId: number;

export function scheduleCommit(diff: Record<string, any>) {
	if (!isLoggedIn()) return;
	diffToCommit = { ...diffToCommit, ...diff };
	clearTimeout(timeoutId);
	timeoutId = setTimeout(commitUpdates, 500) as any;
}

function commitUpdates() {
	const authToken = getSession().user?.authToken as string;
	const body = JSON.stringify(diffToCommit);
	fetch(`${endpoint}/user/data`, {
		method: 'POST',
		headers: {
			authToken: authToken,
			'Content-Type': 'application/json'
		},
		body: body
	});
	diffToCommit = {};
}

function getDiff(key: string, prevValue: any, newValue: any) {
	let diff: Record<string, any> = {};
	if (prevValue === newValue) {
		return diff;
	}
	if (prevValue === null || newValue === null) {
		diff[key] = newValue;
		return diff;
	}
	if (newValue instanceof Array) {
		if (arraysEqual(prevValue, newValue)) {
			return diff;
		}
		if (prevValue instanceof Array) {
			const maxLength = Math.max(prevValue.length, newValue.length);
			for (let i = 0; i < maxLength; i++) {
				const newKey = `${key}.${i}`;
				const subDiff = getDiff(newKey, prevValue[i], newValue[i]);
				diff = { ...diff, ...subDiff };
			}
			return diff;
		}
		diff[key] = newValue;
		return diff;
	}
	if (typeof prevValue === 'object' && typeof newValue === 'object') {
		for (const subKey of Array.from(
			new Set([...Object.keys(prevValue), ...Object.keys(newValue)])
		)) {
			const newKey = `${key}.${subKey}`;
			if (!(subKey in prevValue) || !(subKey in newValue)) {
				diff[newKey] = newValue[subKey];
				continue;
			}
			const subDiff = getDiff(newKey, prevValue[subKey], newValue[subKey]);
			diff = { ...diff, ...subDiff };
		}
	} else {
		diff[key] = newValue;
	}
	return diff;
}

function arraysEqual<T>(arr1: T[], arr2: T[]) {
	if (arr1?.length !== arr2?.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}
