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

function getScore(knowledge: Knowledge, language: LanguageCode, w: string) {
	if (!knowledge[language]) {
		return 0;
	}
	const scores = knowledge[language] as KnowledgeScores;
	const word = w.toLowerCase();
	if (!scores[word]) {
		return 0;
	}
	const [score] = scores[word] || [0];
	return score;
}

export function isKnown(knowledge: Knowledge, language: LanguageCode, word: string) {
	return getScore(knowledge, language, word) > 0;
}

const masteredScore = 50;
export function getKnownPercent(knowledge: Knowledge, language: LanguageCode, words: string[]) {
	const total = words.length;
	let distance = total;
	for (const word of words) {
		const score = getScore(knowledge, language, word);
		distance -= Math.min(Math.pow(score / masteredScore, 0.1), 1);
	}
	return (total - distance) / total;
}
