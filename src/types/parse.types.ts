export type ParsedText = {
	rawText: string;
	lines: TextLine[];
};

export type TextLine = {
	sentences: Sentence[];
	startTokenIndex?: number;
	endTokenIndex?: number;
};

export type Sentence = {
	tokens: Token[];
};

export type Token = {
	text: string;
	tradText?: string;
	transliterations?: string[];
	suffix: string;
	tag: string;
	pos: string;
	morph: string;
	lemma: string;
	isWord: boolean;
	start: number;
	end: number;
	timing?: [number, number];
	index?: number;
};
