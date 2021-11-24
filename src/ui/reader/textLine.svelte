<script lang="ts">
	import { Icon } from '@smui/common';
	import { isKnown } from '../../data/knowledge';
	import type { LanguageCode } from '../../types/dictionary.types';
	import type { Knowledge } from '../../types/knowledge.types';
	import type { TextLine, Token } from '../../types/parse.types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let line: TextLine;
	export let selectedToken: Token | null;
	export let currentTime: number;
	export let timing: [number, number] = [-1, -1];
	export let lang: LanguageCode;
	export let knowledge: Knowledge;
	export let lookedUpWords: Set<string>;

	function lineSpacingStyle(token: Token) {
		return `padding-bottom: ${[...token.text].filter((x) => x === '\n').length * 2}px`;
	}

	function lookupWord(token: Token, e: MouseEvent) {
		if (!token.isWord) return;
		dispatch('lookup', { token, target: e.target });
	}

	function seekToLine() {
		dispatch('seek', { time: timing[0] });
	}
</script>

<div
	class="mdc-typography--body1 line"
	class:isCurrent={timing[0] - 0.25 <= currentTime && currentTime <= timing[1]}
>
	{#if timing[0] >= 0}
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
					class:selected={selectedToken === token}
					class:lemmaUnknown={token.isWord && !isKnown(knowledge, lang, token.lemma)}
					class:wordUnknown={token.isWord && !isKnown(knowledge, lang, token.text)}
					class:lookedUp={lookedUpWords.has(token.text.toLowerCase())}
					on:click={(e) => lookupWord(token, e)}>{token.text}</span
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
		transition: border-color 0.5s ease-in-out;
		transition: background-color 0.5s ease-in-out;
	}
	.word.lemmaUnknown {
		background-color: rgba(0, 0, 255, 0.3);
	}
	.word.wordUnknown {
		border-color: rgba(0, 0, 255, 0.5);
	}
	.word.lookedUp {
		background-color: rgba(255, 230, 0, 0.5);
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

	.selected {
		text-decoration: underline;
	}
	.isCurrent {
		background-color: var(--border-color);
		transition: background-color 0.5s ease-in-out; /* fade in time*/
	}
	.icon {
		vertical-align: text-top;
		border: none;
		background: none;
		cursor: pointer;
		color: var(--foreground);
	}
</style>
