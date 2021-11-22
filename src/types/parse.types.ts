export type ParsedText = {
	rawText: string;
	lines: TextLine[];
};

export type TextLine = {
	sentences: Sentence[];
};

export type Sentence = {
	tokens: Token[];
};

export type Token = {
	text: string;
	suffix: string;
	tag: string;
	pos: string;
	morph: string;
	lemma: string;
	isWord: boolean;
	start: number;
	end: number;
};
