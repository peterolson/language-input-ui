import type { LanguageCode } from 'src/types/dictionary.types';

const translations: Record<LanguageCode, Record<string, string>> = {
	en: {
		'homepage.title': 'Hello, World!',
		'homepage.welcome': 'Hi <strong>{{name}}</strong>, how are you?',
		'homepage.time': 'The current time is: {{time}}'
	},
	es: {
		'homepage.title': '¡Hola Mundo!',
		'homepage.welcome': 'Hola, <strong>{{name}}</strong>, ¿cómo estás?',
		'homepage.time': 'La hora actual es: {{time}}'
	},
	zh: {},
	ca: {},
	fr: {},
	de: {},
	el: {},
	it: {},
	ja: {},
	lt: {},
	mk: {},
	nb: {},
	pl: {},
	pt: {},
	ro: {},
	ru: {},
	da: {},
	nl: {}
};

export default translations;
