<script lang="ts">
	import { endpoint } from '../../data/endpoint';
	import { settings } from '../../data/settings';
	import { onMount } from 'svelte';
	import type { ContentItemSummary, SkeletonItem } from '../../types/content.types';
	import ContentCard from './ContentCard.svelte';
	import { t } from '../../i18n/i18n';
	import { getViewedContentIds, historyStore } from '../../data/history';

	export let requestHandler:
		| string
		| ((skip: number, limit: number, langs: string) => Promise<ContentItemSummary[]>);
	const { targetLanguages } = settings;

	let skip = 0;
	let limit = 25;
	let contentList: (ContentItemSummary | SkeletonItem)[] = getSkeletons(limit);
	let container: HTMLDivElement;
	let reachedEnd = false;
	let isLoadingMore = false;

	function getSkeletons(length: number): SkeletonItem[] {
		return Array.apply(null, Array(length)).map(function (x, i) {
			return { _id: 'empty' + i, skeleton: true };
		});
	}
	function getLimit(container: HTMLDivElement) {
		if (!container) return 25;
		// dynamic limit based on screen size
		return Math.min(
			50,
			Math.ceil(container.offsetWidth / 350) * (Math.ceil(container.offsetHeight / 275) + 1)
		);
	}

	async function updateContentList() {
		try {
			limit = getLimit(container);
			const langs = $targetLanguages.join('|');
			const viewedIds = getViewedContentIds($historyStore);
			let list = [];
			if (typeof requestHandler === 'function') {
				list = await requestHandler(skip, limit, langs);
			} else if (langs.length) {
				list = await fetch(
					`${endpoint}${requestHandler}langs=${langs}&skip=${skip}&limit=${limit}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							viewedIds
						})
					}
				).then((x) => x.json());
			}
			if (!list.length) {
				reachedEnd = true;
			}
			contentList = contentList.filter((x) => !('skeleton' in x)).concat(list);
		} catch (e) {
			contentList = [];
		}
		isLoadingMore = false;
	}

	onMount(async () => {
		targetLanguages.subscribe((langs) => {
			skip = 0;
			limit = getLimit(container);
			contentList = getSkeletons(limit);
			isLoadingMore = true;
			reachedEnd = false;
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

<svelte:head>
	<title>Language input</title>
</svelte:head>

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
