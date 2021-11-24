<script lang="ts">
	import IconButton from '@smui/icon-button/IconButton.svelte';

	import { t } from '../../i18n/i18n';

	export let type: string;
	export let items: { word: string; score: number; color: string }[];

	let wordsDiv: HTMLDivElement;
	let isExpanded: boolean = false;

	function canExpand(wordsDiv: HTMLDivElement) {
		if (!wordsDiv) {
			return false;
		}
		return wordsDiv.scrollHeight > wordsDiv.clientHeight;
	}
</script>

<div class="container">
	<div class="mdc-typography--body1 space-between">
		<span class="title">{$t('progress.' + type)}</span>
		<span><strong>{items.length}</strong></span>
	</div>
	<div class="words" bind:this={wordsDiv} class:expanded={isExpanded}>
		{#each items as item}
			<div class="word mdc-typography--body2" style={`background-color:${item.color}`}>
				{item.word}
			</div>
		{/each}
	</div>
	{#if canExpand(wordsDiv)}
		<IconButton class="material-icons" on:click={() => (isExpanded = !isExpanded)}>
			{isExpanded ? 'expand_less' : 'expand_more'}
		</IconButton>
	{/if}
</div>

<style>
	.container {
		margin: 8px;
		padding: 8px;
		border: 1px solid var(--border-color);
		border-radius: 8px;
	}
	.space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.words {
		max-height: 100px;
		overflow: hidden;
	}
	.words.expanded {
		max-height: none;
	}

	.word {
		display: inline-block;
		margin: 2px;
		padding: 4px;
		border: 1px solid var(--border-color);
		border-radius: 4px;
	}
</style>
