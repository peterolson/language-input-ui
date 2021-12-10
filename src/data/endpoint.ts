import { dev, browser } from '$app/env';

export const endpoint = dev
	? browser
		? window.location.protocol + '//' + window.location.host.replace('3001', '3000')
		: 'http://localhost:3000'
	: 'https://api.languageinput.com';
