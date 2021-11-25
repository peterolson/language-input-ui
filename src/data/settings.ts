import { LanguageCode } from '../types/dictionary.types';
import { writable } from 'svelte/store';
import { browser } from '$app/env';

const isDarkMode = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}
	return !window.matchMedia('(prefers-color-scheme: light)').matches;
};

const defaultSettings = {
	userLanguage: LanguageCode.English,
	targetLanguages: [] as LanguageCode[],
	darkMode: isDarkMode(),
	isTraditional: false
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
	userLanguage: getWritable('userLanguage', defaultSettings.userLanguage),
	targetLanguages: getWritable('targetLanguages', defaultSettings.targetLanguages),
	darkMode: getWritable('darkMode', defaultSettings.darkMode),
	isTraditional: getWritable('isTraditional', defaultSettings.isTraditional)
};

function switchTheme(isDark: boolean) {
	let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');
	if (!themeLink) {
		themeLink = document.createElement('link');
		themeLink.rel = 'stylesheet';
		themeLink.id = 'theme';
	}
	themeLink.href = `/smui${isDark ? '-dark' : ''}.css`;
	document.head
		.querySelector<HTMLLinkElement>('link[href="/smui-dark.css"]')
		?.insertAdjacentElement('afterend', themeLink);
}
if (browser) {
	settings.darkMode.subscribe((isDark) => {
		switchTheme(isDark);
	});
}
