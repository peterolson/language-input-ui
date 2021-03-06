<script lang="ts">
	import { endpoint } from '../../data/endpoint';
	import { settings } from '../../data/settings';
	import { onMount } from 'svelte';
	import type { ContentItemSummary, SkeletonItem } from '../../types/content.types';
	import ContentCard from './ContentCard.svelte';
	import { t } from '../../i18n/i18n';
	import { getViewedContentIds, historyStore } from '../../data/history';
	import { Icon } from '@smui/common';
	import { browser } from '$app/env';
	import { getRecommendationData, ignoreVideos } from '../../data/recommend';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let requestHandler:
		| string
		| ((skip: number, limit: number, langs: string) => Promise<ContentItemSummary[]>);
	export let showFilters = false;
	export let fullWidth = false;
	export let preventUpdate = false;

	const { targetLanguages, isTraditional } = settings;

	let skip = 0;
	let limit = 25;
	let contentList: (ContentItemSummary | SkeletonItem)[] = getSkeletons(limit);
	let container: HTMLDivElement;
	let reachedEnd = false;
	let isLoadingMore = false;
	let sortBy = (browser && localStorage.getItem('contentList.sortBy')) || 'recommended';
	let durationFilter =
		(browser && localStorage.getItem('contentList.durationFilter')) || '0-Infinity';

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

	async function updateContentList(clearCurrent = false) {
		try {
			limit = getLimit(container);
			const langs = $targetLanguages.join('|');
			const viewedIds = getViewedContentIds($historyStore);
			const minDuration = +durationFilter.split('-')[0] * 60;
			const maxDuration = +durationFilter.split('-')[1] * 60;
			let list = [];
			if (typeof requestHandler === 'function') {
				list = await requestHandler(skip, limit, langs);
			} else if (langs.length) {
				const { recommend, ignore } = await getRecommendationData();
				list = await fetch(
					`${endpoint}${requestHandler}langs=${langs}&skip=${skip}&limit=${limit}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							viewedIds,
							sortBy,
							minDuration,
							maxDuration,
							isTraditional: $isTraditional,
							recommend,
							ignore
						})
					}
				).then((x) => x.json());
				dispatch('load', list);
			}
			if (!list.length) {
				reachedEnd = true;
			}
			if (clearCurrent) {
				contentList = list;
			} else {
				contentList = contentList.filter((x) => !('skeleton' in x)).concat(list);
			}
		} catch (e) {
			contentList = [];
			console.error(e);
		}
		isLoadingMore = false;
	}

	function init() {
		if (contentList.filter((x) => !('skeleton' in x)).length && preventUpdate) {
			return;
		}
		skip = 0;
		limit = getLimit(container);
		contentList = getSkeletons(limit);
		isLoadingMore = true;
		reachedEnd = false;
		updateContentList(true);
	}

	onMount(async () => {
		let hasHistory = false;
		let hasLangs = false;
		historyStore.subscribe(() => {
			if (hasLangs) {
				init();
			}
			hasHistory = true;
		});
		targetLanguages.subscribe(() => {
			if (hasHistory) {
				init();
			}
			hasLangs = true;
		});
	});

	function onScroll() {
		if (reachedEnd || isLoadingMore || preventUpdate) return;
		const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
		if (distanceToBottom < 275) {
			skip += limit;
			isLoadingMore = true;
			contentList = contentList.concat(getSkeletons(limit));
			updateContentList();
		}
	}

	function updateFilter() {
		localStorage.setItem('contentList.sortBy', sortBy);
		localStorage.setItem('contentList.durationFilter', durationFilter);
		init();
	}

	function clickItem(i: number) {
		if ('lang' in contentList[i]) {
			const lang = (contentList[i] as ContentItemSummary).lang;
			const ignoredContent = (
				contentList.slice(0, i).filter((x) => !('skeleton' in x)) as ContentItemSummary[]
			)
				.filter((x) => x.lang === lang)
				.map((x) => ({ id: x._id }));
			ignoreVideos(ignoredContent);
		}
	}
</script>

<div class="container" bind:this={container} on:scroll={onScroll}>
	{#if showFilters}
		<div class="filters">
			<div>
				<Icon class="material-icons">sort</Icon>
				<select class="mdc-typography--body2" bind:value={sortBy} on:change={updateFilter}>
					<option value="recommended">{$t('sort.recommended')}</option>
					<option value="newest">{$t('sort.newest')}</option>
					<option value="popular">{$t('sort.popular')}</option>
				</select>
			</div>
			<div>
				<Icon class="material-icons">timer</Icon>
				<select class="mdc-typography--body2" bind:value={durationFilter} on:change={updateFilter}>
					<option value="0-Infinity">{$t('sort.anyDuration')}</option>
					<option value="0-4">&lt;4{$t('progress.minute')}</option>
					<option value="4-10">4{$t('progress.minute')}-10{$t('progress.minute')}</option>
					<option value="10-20">10{$t('progress.minute')}-20{$t('progress.minute')}</option>
					<option value="20-Infinity">>20{$t('progress.minute')}</option>
				</select>
			</div>
		</div>
	{/if}
	{#if contentList.length}
		{#each contentList as content, i}
			{#key content._id}
				<ContentCard {content} {fullWidth} on:click={() => clickItem(i)} />
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

	.filters {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		padding: 8px;
	}

	.filters div {
		display: flex;
		align-items: center;
	}

	.filters select {
		margin-left: 4px;
	}

	.empty {
		padding: 16px;
		height: 100%;
	}
</style>
