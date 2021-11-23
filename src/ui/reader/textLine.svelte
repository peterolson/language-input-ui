<script lang="ts">
	import { Icon } from '@smui/common';
	import IconButton from '@smui/icon-button/IconButton.svelte';
	import type { TextLine, Token } from 'src/types/parse.types';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let line: TextLine;
	export let selectedToken: Token | null;
	export let currentTime: number;
	export let timing: [number, number] = [-1, -1];

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

<div class="mdc-typography--body1 line">
	{#if timing[0] >= 0}
		<button class="icon" on:click={seekToLine}>
			<Icon class="material-icons">play_arrow</Icon>
		</button>
	{/if}
	{#each line.sentences as sentence}
		<span
			class="sentence"
			class:isCurrent={timing[0] - 0.25 <= currentTime && currentTime <= timing[1]}
		>
			{#each sentence.tokens as token}
				<span
					class:word={token.isWord}
					class:selected={selectedToken === token}
					on:click={(e) => lookupWord(token, e)}>{token.text}</span
				>{token.suffix}{#if token.text.includes('\n')}
					<div style={lineSpacingStyle(token)} />
				{/if}
			{/each}
		</span>
	{/each}
</div>

<style>
	.line {
		font-size: 115%;
		line-height: 32px;
	}

	.sentence {
		transition: background-color 0.5s ease-in-out; /* fade out time*/
	}

	.word {
		cursor: pointer;
		display: inline-block;
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
	}
</style>
