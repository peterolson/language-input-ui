import type { DictionaryExample, DictionaryLookup, LanguageCode } from '../types/dictionary.types';

export async function lookupWord(
	word: string,
	from: LanguageCode,
	to: LanguageCode
): Promise<DictionaryLookup> {
	const response: DictionaryLookup = await fetch('http://localhost:3000/dictionary', {
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
	const response: DictionaryExample[] = await fetch('http://localhost:3000/dictionary/examples', {
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
