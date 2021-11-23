<script lang="ts">
	import type { ContentItemSummary } from '../../types/content.types';
	import ContentCard from './ContentCard.svelte';

	export let contentList: ContentItemSummary[];
</script>

<div class="container">
	{#each contentList as content}
		<ContentCard {content} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}
</style>
