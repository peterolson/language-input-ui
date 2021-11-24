<script lang="ts">
	import { endpoint } from '../../data/endpoint';
	import { settings } from '../../data/settings';
	import { onMount } from 'svelte';
	import type { ContentItemSummary, SkeletonItem } from '../../types/content.types';
	import ContentCard from './ContentCard.svelte';
	import { t } from '../../i18n/i18n';

	const { targetLanguages } = settings;

	let skip = 0;
	let limit = 25;
	let contentList: (ContentItemSummary | SkeletonItem)[] = getSkeletons(limit);
	let container: HTMLDivElement;
	let reachedEnd = false;
	let isLoadingMore = false;

	function getSkeletons(length: number): SkeletonItem[] {
		return Array.apply(null, Array(limit)).map(function (x, i) {
			return { _id: 'empty' + i, skeleton: true };
		});
	}
	function getLimit(container: HTMLDivElement) {
		if (!container) return 25;
		// dynamic limit based on screen size
		return Math.ceil(container.offsetWidth / 350) * (Math.ceil(container.offsetHeight / 275) + 1);
	}

	async function updateContentList() {
		limit = getLimit(container);
		const langs = $targetLanguages.join('|');
		const list = langs.length
			? await fetch(`${endpoint}/content/newest?langs=${langs}&skip=${skip}&limit=${limit}`).then(
					(x) => x.json()
			  )
			: [];
		if (!list.length) {
			reachedEnd = true;
		}
		contentList = contentList.filter((x) => !('skeleton' in x)).concat(list);
		isLoadingMore = false;
	}

	onMount(async () => {
		targetLanguages.subscribe((langs) => {
			skip = 0;
			limit = getLimit(container);
			contentList = getSkeletons(limit);
			isLoadingMore = true;
			reachedEnd = false;
			console.log('subscribed to target languages', langs);
			updateContentList();
		});
	});

	function onScroll() {
		if (reachedEnd || isLoadingMore) return;
		const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
		if (distanceToBottom < 275) {
			skip += limit;
			isLoadingMore = true;
			updateContentList();
		}
	}
</script>

<div class="container" bind:this={container} on:scroll={onScroll}>
	{#if contentList.length}
		{#each contentList as content}
			{#key content._id}
				<ContentCard {content} />
			{/key}
		{/each}
	{:else}
		<div class="mdc-typography--body2 empty">{$t('content.empty')}</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: space-evenly;
		flex-wrap: wrap;
		overflow: auto;
	}

	.empty {
		padding: 16px;
	}
</style>
