import type { LanguageCode } from 'src/types/dictionary.types';
import type { ParsedText } from 'src/types/parse.types';

export async function parseText(text: string, lang: LanguageCode): Promise<ParsedText> {
	const response: ParsedText = await fetch('http://localhost:3000/parse', {
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
