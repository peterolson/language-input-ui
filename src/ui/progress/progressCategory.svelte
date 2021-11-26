<script lang="ts">
	import IconButton from '@smui/icon-button';

	import { t } from '../../i18n/i18n';

	export let type: string;
	export let items: { word: string; score: number; color: string }[];

	const DEFAULT_LIMIT = 50;
	let limit = DEFAULT_LIMIT;

	function expand() {
		if (limit < items.length) {
			limit += DEFAULT_LIMIT;
		} else {
			limit = DEFAULT_LIMIT;
		}
	}
</script>

<div class="container">
	<div class="mdc-typography--body1 space-between">
		<span class="title">{$t('progress.' + type)}</span>
		<span><strong>{items.length}</strong></span>
	</div>
	<div class="words">
		{#each items.slice(0, limit) as item}
			<div class="word mdc-typography--body2" style={`background-color:${item.color}`}>
				{item.word}
			</div>
		{/each}
	</div>
	{#if items.length > DEFAULT_LIMIT}
		<IconButton class="material-icons" on:click={expand}>
			{limit < items.length ? 'expand_more' : 'expand_less'}
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

	.word {
		display: inline-block;
		margin: 2px;
		padding: 4px;
		border: 1px solid var(--border-color);
		border-radius: 4px;
	}
</style>
