<script lang="ts">
	import { languageNames } from '../../types/dictionary.types';
	import { settings } from '../../data/settings';

	import type { ContentItem } from '../../types/content.types';
	import { t } from '../../i18n/i18n';
	import { Icon } from '@smui/common';
	const { userLanguage } = settings;

	export let content: ContentItem;
	let dateFormat: Intl.DateTimeFormat;
	$: {
		dateFormat = new Intl.DateTimeFormat($userLanguage);
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
	<div class="mdc-typography--body2 space-between">
		<div class="iconNumber">
			{#if content.views}
				<Icon class="material-icons" style="font-size:unset">visibility</Icon>
				<span>{content.views}</span>
			{/if}
		</div>
		<div class="iconNumber">
			{#if content.dislikes}
				<Icon class="material-icons" style="font-size:unset">thumb_down</Icon>
				<span>{content.dislikes}</span>
			{/if}
		</div>
		<div class="iconNumber">
			{#if content.neutral}
				<Icon class="material-icons" style="font-size:unset">sentiment_neutral</Icon>
				<span>{content.neutral}</span>
			{/if}
		</div>
		<div class="iconNumber">
			{#if content.likes}
				<Icon class="material-icons" style="font-size:unset">thumb_up</Icon>
				<span>{content.likes}</span>
			{/if}
		</div>
	</div>
	<hr />
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
	.iconNumber {
		display: flex;
		align-items: center;
	}
	.iconNumber span {
		margin-left: 4px;
		margin-top: 2px;
	}
</style>
