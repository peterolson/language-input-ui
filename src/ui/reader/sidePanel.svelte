<script lang="ts">
	import { languageNames } from '../../types/dictionary.types';
	import { settings } from '../../data/settings';

	import type { ContentItem, ContentItemSummary } from '../../types/content.types';
	import { t } from '../../i18n/i18n';
	import ContentList from '../content/ContentList.svelte';
	const { userLanguage } = settings;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let content: ContentItem;
	let dateFormat: Intl.DateTimeFormat;
	$: {
		dateFormat = new Intl.DateTimeFormat($userLanguage);
	}

	function onListLoaded(e: CustomEvent<ContentItemSummary[]>) {
		dispatch('recommend', e.detail);
	}
</script>

<div class="container">
	<div class="mdc-typography--body1 space-between">
		<a href={`/content/channel/${content.channel}`} sveltekit:prefetch>
			{content.channel}
		</a>
		<span class="secondary">{languageNames[content.lang]}</span>
	</div>
	<div class="mdc-typography--body2">
		{content.title}
	</div>
	<div class="mdc-typography--body2 secondary space-between">
		<span>{dateFormat.format(new Date(content.publishedDate))}</span>
		<span>{$t('card.words')}: {content.wordCount}</span>
	</div>
	<div class="mdc-typography--caption">
		<a href={content.url} target="_blank">{content.url}</a>
	</div>
	<hr />
	<ContentList
		requestHandler={`/content/recommend?channel=${encodeURIComponent(content.channel)}&lang=${
			content.lang
		}&difficulty=${content.difficulty}&id=${content._id}&`}
		fullWidth
		preventUpdate={true}
		on:load={onListLoaded}
	/>
</div>

<style>
	.container {
		padding: 8px;
	}
	.space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.secondary {
		opacity: 0.7;
	}
	a {
		max-width: 100%;
		overflow: hidden;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
