import type { LanguageCode } from '../types/dictionary.types';
import type { ParsedText } from '../types/parse.types';
import { endpoint } from './endpoint';

export async function parseText(text: string, lang: LanguageCode): Promise<ParsedText> {
	const response: ParsedText = await fetch(`${endpoint}/parse`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			lang,
			text
		})
	}).then((res) => res.json());
	console.log(response);
	return response;
}
