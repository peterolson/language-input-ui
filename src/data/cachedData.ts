import { browser } from '$app/env';
import localforage from 'localforage';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

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
			cachedData.value = value;
			cachedData.store.set(value);
			localforage.setItem(storageKey, value);
		}
	};
	if (browser) {
		localforage.getItem(storageKey, (err, value) => {
			if (err) {
				return;
			}
			if (value) {
				cachedData.value = value as T;
				cachedData.store.set(value as T);
			}
		});
	}

	return cachedData;
}
