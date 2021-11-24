import type { LanguageCode } from './dictionary.types';
import type { Media } from './media.types';
import type { ParsedText } from './parse.types';

export type ContentItem = {
	_id: string;
	lang: LanguageCode;
	title: string;
	thumb: string;
	parsedText: ParsedText;
	timings: [number, number][];
	media: Media;
	lemmas: string[];
	wordCount: number;
	url: string;
	publishedDate: Date;
	channel: string;
	duration: number;
	likes: number;
	dislikes: number;
	neutral: number;
	views: number;
};

export type ContentItemSummary = {
	_id: string;
	lang: string;
	title: string;
	thumb: string;
	lemmas: string[];
	wordCount: number;
	channel: string;
	duration: number;
	publishedDate: Date;
	likes: number;
	dislikes: number;
	neutral: number;
	views: number;
};

export type SkeletonItem = {
	_id: string;
	skeleton: true;
};
