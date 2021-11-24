import localforage from 'localforage';
import type { Knowledge, KnowledgeScores } from '../types/knowledge.types';
import { updateScore } from 'knowledge-score';
import { writable } from 'svelte/store';
import type { LanguageCode } from 'src/types/dictionary.types';
import { browser } from '$app/env';

let knowledge: Knowledge = {};
export const knowledgeStore = writable(knowledge);

if (browser) {
	localforage.getItem('knowledge', (err, value) => {
		if (err) {
			return;
		}
		if (value) {
			knowledge = value as Knowledge;
			knowledgeStore.set(knowledge);
		}
	});
}

const markPoints = (points: number) => (words: string[], language: LanguageCode) => {
	knowledge[language] = knowledge[language] || {};
	const LanguageKnowledge = knowledge[language] as KnowledgeScores;
	for (const w of words) {
		const word = w.toLowerCase();
		const [oldScore, previousTimestamp] = LanguageKnowledge[word] || [0, +new Date()];
		const newScore = updateScore(points, oldScore, new Date(previousTimestamp));
		const newTimestamp = +new Date();
		LanguageKnowledge[word] = [newScore, newTimestamp];
	}
	knowledge = { ...knowledge };
	knowledgeStore.set(knowledge);
	localforage.setItem('knowledge', knowledge);
};

export const markKnown = markPoints(1);
export const markUnknown = markPoints(0);

function getScore(scores: KnowledgeScores | undefined, w: string) {
	if (!scores) {
		return 0;
	}
	const word = w.toLowerCase();
	if (!scores[word]) {
		return 0;
	}
	const [score] = scores[word] || [0];
	return score;
}

export function isKnown(knowledge: Knowledge, language: LanguageCode, word: string) {
	return getScore(knowledge[language], word) > 0;
}

const masteredScore = 50;
export function getKnownPercent(knowledge: Knowledge, language: LanguageCode, words: string[]) {
	const total = words.length;
	let distance = total;
	for (const word of words) {
		const score = getScore(knowledge[language], word);
		distance -= Math.min(Math.pow(score / masteredScore, 0.1), 1);
	}
	return (total - distance) / total;
}

const cutoffs = [50, 30, 15, 5, 0];
export const PROGRESS_KEYS = ['mastered', 'wellKnown', 'known', 'familiar', 'new', 'unknown'];

export function getProgressKey(scores: KnowledgeScores, word: string) {
	const score = getScore(scores, word);
	let i = 0;
	while (i < cutoffs.length) {
		if (score > cutoffs[i]) {
			return PROGRESS_KEYS[i];
		}
		i++;
	}
	return PROGRESS_KEYS[i];
}

export function getBreakdownByCategory(scores: KnowledgeScores, isDark: boolean) {
	const breakdown: Record<string, { word: string; score: number; color: string }[]> = {};
	for (const word in scores) {
		const score = getScore(scores, word);
		if (!score) continue;
		const key = getProgressKey(scores, word);
		breakdown[key] = breakdown[key] || [];
		breakdown[key].push({ word, score, color: getColor(isDark, score) });
	}
	const out: {
		type: string;
		items: {
			word: string;
			score: number;
			color: string;
		}[];
	}[] = [];
	for (const key of PROGRESS_KEYS) {
		if (breakdown[key]) {
			out.push({
				type: key,
				items: breakdown[key].sort((a, b) => b.score - a.score)
			});
		}
	}
	return out;
}

function getColor(isDark: boolean, score: number) {
	const scoreMin = 0;
	const scoreMax = 100;
	const MIN_COLOR = isDark ? [0, 0, 0] : [255, 255, 204];
	const MAX_COLOR = [50, 150, 50];
	const ratio = Math.log(score - scoreMin + 1) / Math.log(scoreMax - scoreMin + 1);
	const color = MIN_COLOR.map((min, i) => {
		const max = MAX_COLOR[i];
		return Math.round(min + (max - min) * ratio);
	});
	return `rgb(${color.join(',')})`;
}
