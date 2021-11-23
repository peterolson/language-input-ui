import type { DictionaryExample, DictionaryLookup, LanguageCode } from '../types/dictionary.types';
import { endpoint } from './endpoint';

export async function lookupWord(
	word: string,
	from: LanguageCode,
	to: LanguageCode
): Promise<DictionaryLookup> {
	const response: DictionaryLookup = await fetch(`${endpoint}/dictionary`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from,
			to,
			word
		})
	}).then((res) => res.json());
	return response;
}

export async function getExamples(
	word: string,
	translation: string,
	from: LanguageCode,
	to: LanguageCode
): Promise<DictionaryExample[]> {
	const response: DictionaryExample[] = await fetch(`${endpoint}/dictionary/examples`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from,
			to,
			word,
			translation
		})
	}).then((res) => res.json());
	return response;
}
