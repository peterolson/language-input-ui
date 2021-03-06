import type { RequestHandler } from '@sveltejs/kit';
import {
	MICROSOFT_SPEECH_ISSUE_TOKEN_ENDPOINT,
	MICROSOFT_SPEECH_ISSUE_TOKEN_HOST,
	MICROSOFT_SPEECH_SUBSCRIPTION_KEY
} from '../api/config';

const EXPIRE_MS = 1000 * 60 * 9;
let lastTokenTimestamp: number;
let lastToken: string;

export const get: RequestHandler<Locals> = async () => {
	if (lastTokenTimestamp) {
		if (+new Date() - lastTokenTimestamp < EXPIRE_MS) {
			return {
				status: 200,
				body: { token: lastToken, timeToExpire: lastTokenTimestamp + EXPIRE_MS - +new Date() }
			};
		}
	}
	const token = await fetch(MICROSOFT_SPEECH_ISSUE_TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			'Ocp-Apim-Subscription-Key': MICROSOFT_SPEECH_SUBSCRIPTION_KEY,
			Host: MICROSOFT_SPEECH_ISSUE_TOKEN_HOST,
			'Content-type': 'application/x-www-form-urlencoded',
			'Content-Length': '0'
		}
	}).then((response) => response.text());
	lastToken = token;
	lastTokenTimestamp = +new Date();
	return { status: 200, body: { token, timeToExpire: EXPIRE_MS } };
};
