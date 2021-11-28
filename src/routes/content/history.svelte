<script lang="ts">
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { getViewedContentIds, historyStore } from '../../data/history';
	import ContentList from '../../ui/content/ContentList.svelte';
	import type { ContentItemSummary } from '../../types/content.types';
	import { endpoint } from '../../data/endpoint';
	import { viewProgressStore } from '../../data/viewProgress';
	import { t } from '../../i18n/i18n';

	const tabs = ['history', 'continueWatching', 'uploads'];
	let activeTab = 'history';

	const getHistoryByAction = (action: string) => async (skip: number, limit: number) => {
		const historyItems = [];
		const history = $historyStore;
		const hasEncountered = new Set<string>();
		for (let i = history.length - 1; i >= 0; i--) {
			const item = history[i];
			if (item.action !== action) continue;
			if (hasEncountered.has(item.id)) {
				continue;
			}
			hasEncountered.add(item.id);
			historyItems.push({ id: item.id, timestamp: item.timestamp });
		}
		const ids = historyItems.map((item) => item.id).slice(skip, skip + limit);
		return await fetch(`${endpoint}/content/ids`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ids
			})
		}).then((x) => x.json());
	};

	const handlers: Record<string, (skip: number, limit: number) => Promise<ContentItemSummary[]>> = {
		history: getHistoryByAction('view'),
		uploads: getHistoryByAction('import'),
		continueWatching: async (skip: number, limit: number) => {
			const viewProgress = $viewProgressStore;
			const ids = Object.keys(viewProgress);
			return await fetch(`${endpoint}/content/ids`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ids
				})
			}).then((x) => x.json());
		}
	};
</script>

<svelte:head>
	<title>{$t(`content.${activeTab}`)}</title>
</svelte:head>

<div class="container">
	<TabBar {tabs} let:tab bind:active={activeTab}>
		<Tab {tab}>
			<Label>{$t(`content.${tab}`)}</Label>
		</Tab>
	</TabBar>

	<div>
		{#key activeTab}
			<ContentList requestHandler={handlers[activeTab]} />
		{/key}
	</div>
</div>

<style>
	.container {
		width: 100%;
	}
</style>
