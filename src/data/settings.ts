import { LanguageCode } from '../types/dictionary.types';
import { writable } from 'svelte/store';
import { browser } from '$app/env';

const defaultSettings = {
	userLanguage: LanguageCode.English
};

if (browser) {
	const userLanguage = (window.navigator.languages || [])
		.map((x) => x.slice(0, 2))
		.find((x) => Object.values(LanguageCode).includes(x as LanguageCode));
	if (userLanguage) {
		defaultSettings.userLanguage = userLanguage as LanguageCode;
	}
}

function getStorageKey(key: string) {
	return `settings.${key}`;
}

function getWritable<T>(key: string, defaultValue: T) {
	const storageKey = getStorageKey(key);
	let value: T = defaultValue;
	if (browser) {
		const storedValue = localStorage.getItem(storageKey);
		if (storedValue !== null) {
			value = JSON.parse(storedValue);
		}
	}
	const store = writable<T>(value);
	if (browser) {
		store.subscribe((value) => {
			localStorage.setItem(storageKey, JSON.stringify(value));
		});
	}
	return store;
}

export const settings = {
	userLanguage: getWritable('userLanguage', defaultSettings.userLanguage)
};
