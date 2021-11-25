import type { LanguageCode } from './dictionary.types';

export type Knowledge = Partial<Record<LanguageCode, LanguageKnowledge>>;

export type LanguageKnowledge = {
	totalWords: number;
	totalSeconds: number;
	scores: KnowledgeScores;
};

export type KnowledgeScores = {
	[key: string]: [number, number];
};
