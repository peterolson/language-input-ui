import type { LanguageCode } from './dictionary.types';

export type Knowledge = Partial<Record<LanguageCode, KnowledgeScores>>;

export type KnowledgeScores = {
	[key: string]: [number, number];
};
