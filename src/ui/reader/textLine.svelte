<script lang="ts">
	import { Icon } from '@smui/common';
	import { isKnown, normalizeWord } from '../../data/knowledge';
	import { LanguageCode } from '../../types/dictionary.types';
	import type { Knowledge } from '../../types/knowledge.types';
	import type { TextLine, Token } from '../../types/parse.types';
	import { createEventDispatcher } from 'svelte';
	import { charInCJK } from '../../data/util';
	import { settings } from '../../data/settings';
	const dispatch = createEventDispatcher();

	const { isTraditional } = settings;

	export let line: TextLine;
	export let currentTime: number;
	export let timing: [number, number] = [-1, -1];
	export let nextTiming: [number, number] | undefined;
	export let lang: LanguageCode;
	export let knowledge: Knowledge;
	export let lookedUpWords: Set<string>;

	function lineSpacingStyle(token: Token) {
		return `padding-bottom: ${[...token.text].filter((x) => x === '\n').length * 2}px`;
	}

	function lookupWord(token: Token, e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (!token.isWord) return;
		dispatch('lookup', { token, target: e.target });
	}

	function seekToLine() {
		dispatch('seek', { time: timing[0] });
	}

	function isLemmaUnknown(
		knowledge: Knowledge,
		lang: LanguageCode,
		token: Token,
		isTraditional: boolean
	) {
		if (!token.isWord) return false;
		if (lang === LanguageCode.Chinese) {
			const text = isTraditional && token.tradText ? token.tradText : token.text;
			const chars = [...text].filter(charInCJK);
			return !chars.every((char) => isKnown(knowledge, lang, char));
		}
		return !isKnown(knowledge, lang, token.lemma);
	}

	function isWordUnknown(
		knowledge: Knowledge,
		lang: LanguageCode,
		token: Token,
		isTraditional: boolean
	) {
		if (!token.isWord) return false;
		const text = isTraditional && token.tradText ? token.tradText : token.text;
		return !isKnown(knowledge, lang, text);
	}

	function isCurrent(
		currentTime: number,
		timing: [number, number],
		nextTiming: [number, number] | undefined
	) {
		if (!timing || timing[0] === null) return false;
		const afterStart = timing[0] - 0.25 <= currentTime;
		let beforeEnd = currentTime <= timing[1];
		if (nextTiming) {
			beforeEnd = beforeEnd && currentTime <= nextTiming[0];
		}
		return afterStart && beforeEnd;
	}

	function isCurrentWord(token: Token, currentTime: number) {
		if (token.timing?.length && token.timing[0] !== null) {
			const afterStart = token.timing[0] - 0.25 <= currentTime;
			const beforeEnd = currentTime <= token.timing[1];
			return afterStart && beforeEnd;
		}
		return false;
	}
</script>

<div
	class="mdc-typography--body1 line"
	class:isCurrent={isCurrent(currentTime, timing, nextTiming)}
>
	{#if timing && timing[0] >= 0 && timing[0] !== null}
		<button class="icon" on:click={seekToLine}>
			<Icon class="material-icons">play_arrow</Icon>
		</button>
	{/if}
	{#each line.sentences as sentence}
		<span class="sentence">
			{#each sentence.tokens as token}
				<span
					data-lemma={token.lemma}
					class:word={token.isWord}
					class:nonWord={!token.isWord}
					class:lemmaUnknown={isLemmaUnknown(knowledge, lang, token, $isTraditional)}
					class:wordUnknown={isWordUnknown(knowledge, lang, token, $isTraditional)}
					class:lookedUp={lookedUpWords.has(normalizeWord(token.text))}
					class:isCurrentWord={isCurrentWord(token, currentTime)}
					on:click={(e) => lookupWord(token, e)}
					>{$isTraditional && token.tradText ? token.tradText : token.text}</span
				>{token.suffix}{#if token.text.includes('\n')}
					<div style={lineSpacingStyle(token)} />
				{/if}
			{/each}
		</span>
	{/each}
</div>

<style>
	.word {
		cursor: pointer;
		display: inline-block;
		border: 1px solid transparent;
		border-radius: 5px;
		margin: 1px 0;
		padding: 1px 0;
		transition: border-color 0.5s ease-in-out;
		transition: background-color 0.5s ease-in-out;
		text-decoration: underline;
		text-decoration-color: transparent;
		transition: text-decoration-color 0.5s ease-in-out;
	}
	.word.lemmaUnknown {
		background-color: rgba(255, 115, 0, 0.15);
	}
	.word.wordUnknown {
		border-color: rgba(255, 115, 0, 0.2);
	}
	.word.lookedUp {
		background-color: rgba(255, 230, 0, 0.25);
		border-color: rgba(255, 230, 0, 0.4);
	}

	.word + .nonWord {
		margin-left: -2px;
		padding: 0;
	}

	.nonWord + .word {
		margin-left: -1px;
	}

	.line {
		font-size: 115%;
		line-height: 32px;
		padding-top: 4px;
		padding-bottom: 2px;
	}

	.sentence {
		transition: background-color 0.5s ease-in-out; /* fade out time*/
	}

	.isCurrent {
		background-color: rgba(128, 128, 128, 0.15);
		transition: background-color 0.5s ease-in-out; /* fade in time*/
	}

	.isCurrentWord {
		text-decoration-color: var(--foreground);
		transition: text-decoration-color 0.5s ease-in-out; /* fade in time*/
	}

	.icon {
		vertical-align: text-top;
		border: none;
		background: none;
		cursor: pointer;
		color: var(--foreground);
	}
</style>
