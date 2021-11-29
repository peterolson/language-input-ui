import type { LanguageCode } from 'src/types/dictionary.types';
import type { Progress } from '../types/progress.types';
import { cachedData } from './cachedData';

const progressCache = cachedData<Progress>({}, 'progressData');

export const progressStore = progressCache.store;

export function setProgress(lang: LanguageCode, key: string, value: number) {
	const date = new Date();
	const day = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
	const progress = { ...progressCache.value };
	const langProgress = { ...(progress[lang] = progress[lang] || {}) };
	const dayProgress = { ...(langProgress[day] = langProgress[day] || {}) };
	dayProgress[key] = value;
	langProgress[day] = dayProgress;
	progress[lang] = langProgress;
	progressCache.update({ ...progress });
}

function formatDate(date: Date) {
	return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

export function addToProgress(lang: LanguageCode, key: string, value: number) {
	const date = new Date();
	const day = formatDate(date);
	const progress = { ...progressCache.value };
	const langProgress = { ...(progress[lang] = progress[lang] || {}) };
	const dayProgress = { ...(langProgress[day] = langProgress[day] || {}) };
	dayProgress[key] = (dayProgress[key] || 0) + value;
	langProgress[day] = dayProgress;
	progress[lang] = langProgress;
	progressCache.update({ ...progress });
}

const cumulativeKeys = ['wordsKnown'];

export function getProgress(lang: LanguageCode, key: string, maxDays: number) {
	const progress = progressCache.value;
	const langProgress = progress[lang] || {};
	const days = Object.keys(langProgress).sort();
	const firstDay = days[0] || formatDate(new Date());
	const [year, month, day] = firstDay.split('-').map(Number);
	const date = new Date(0);
	const dataPoints = [];
	const labels = [];
	date.setUTCFullYear(year);
	date.setUTCMonth(month - 1);
	date.setUTCDate(day - (maxDays - 1));
	let previousValue = 0;
	while (date < new Date()) {
		const day = formatDate(date);
		const defaultValue = cumulativeKeys.includes(key) ? previousValue : 0;
		const value = langProgress[day] ? langProgress[day][key] || defaultValue : defaultValue;
		dataPoints.push(value);
		labels.push(day.split('-').slice(1).join('-'));
		previousValue = value;
		date.setUTCDate(date.getUTCDate() + 1);
	}
	return { labels, dataPoints };
}
