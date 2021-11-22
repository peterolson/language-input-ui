export enum LanguageCode {
	Chinese = 'zh',
	Catalan = 'ca',
	Danish = 'da',
	Dutch = 'nl',
	English = 'en',
	French = 'fr',
	German = 'de',
	Greek = 'el',
	Italian = 'it',
	Japanese = 'ja',
	Lithuanian = 'lt',
	Macedonain = 'mk',
	Norweigan = 'nb',
	Polish = 'pl',
	Portuguese = 'pt',
	Romanian = 'ro',
	Russian = 'ru',
	Spanish = 'es'
}

export const languageNames: { [key in LanguageCode]: string } = {
	zh: '中文',
	ca: 'Català',
	da: 'Dansk',
	nl: 'Nederlands',
	en: 'English',
	fr: 'Français',
	de: 'Deutsch',
	el: 'Ελληνικά',
	it: 'Italiano',
	ja: '日本語',
	lt: 'Lietuvių',
	mk: 'Македонски',
	nb: 'Norsk Bokmål',
	pl: 'Polski',
	pt: 'Português',
	ro: 'Română',
	ru: 'Русский',
	es: 'Español'
};

export type DictionaryLookup = {
	normalizedSource: string;
	displaySource: string;
	translations: DictionaryTranslation[];
};

export type DictionaryTranslation = {
	normalizedTarget: string;
	displayTarget: string;
	posTag: string;
	confidence: number;
	prefixWord: string;
	backTranslations: BackTranslation[];
	examples?: DictionaryExample[];
};

export type BackTranslation = {
	normalizedText: string;
	displayText: string;
	numExamples: number;
	frequencyCount: number;
};

export type DictionaryExample = {
	sourcePrefix: string;
	sourceTerm: string;
	sourceSuffix: string;
	targetPrefix: string;
	targetTerm: string;
	targetSuffix: string;
};
