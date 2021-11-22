<script lang="ts">
	import type { LanguageCode } from 'src/types/dictionary.types';
	import type { TextLine, Token } from 'src/types/parse.types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let line: TextLine;
	export let selectedToken: Token | null;

	function lineSpacingStyle(token: Token) {
		return `padding-bottom: ${[...token.text].filter((x) => x === '\n').length * 8}px`;
	}

	function lookupWord(token: Token, e: MouseEvent) {
		if (!token.isWord) return;
		dispatch('lookup', { token, target: e.target });
	}
</script>

<div class="mdc-typography--body1 line">
	{#each line.sentences as sentence}
		<div>
			{#each sentence.tokens as token}
				<span
					class:word={token.isWord}
					class:selected={selectedToken === token}
					on:click={(e) => lookupWord(token, e)}>{token.text}</span
				>{token.suffix}{#if token.text.includes('\n')}
					<div style={lineSpacingStyle(token)} />
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.line {
		font-size: 115%;
		line-height: 32px;
		padding: 8px;
	}
	.word {
		cursor: pointer;
		display: inline-block;
	}
	.selected {
		text-decoration: underline;
	}
</style>
