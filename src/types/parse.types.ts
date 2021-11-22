export type ParsedText = {
	lines: TextLine[];
};

export type TextLine = {
	text: string;
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
};
