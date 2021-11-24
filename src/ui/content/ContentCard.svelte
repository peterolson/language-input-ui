<script lang="ts">
	import { languageNames } from '../../types/dictionary.types';
	import type { ContentItemSummary, SkeletonItem } from '../../types/content.types';
	import Duration from './Duration.svelte';
	import { t } from '../../i18n/i18n';
	import { SkeletonBlock, SkeletonText } from 'skeleton-elements/svelte';

	export let content: ContentItemSummary | SkeletonItem;
	let languageName: string = '';
	let title: string = '';
	if ('lang' in content) {
		languageName = languageNames[content.lang as keyof typeof languageNames];
		title = content.title;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/skeleton-elements.css" />
</svelte:head>

<div class="card" {title}>
	{#if 'skeleton' in content}
		<div class="imageContainer">
			<SkeletonBlock width="100%" height="100%" effect="wave" borderRadius="5px" />
		</div>
		<div class="mdc-typography--caption captionLine">
			<div><SkeletonText effect="wave">Dummy channel name</SkeletonText></div>
			<div><SkeletonText effect="wave">Russian</SkeletonText></div>
		</div>
		<div class="mdc-typography--body2 noWrapText">
			<SkeletonText effect="wave">
				This is a very long dummy video title. It should occupy two full lines. Like this.
			</SkeletonText>
		</div>
		<div class="mdc-typography--caption captionLine">
			<SkeletonText effect="wave">1000 words</SkeletonText>
		</div>
	{:else}
		<a href={`content/${content._id}`} sveltekit:prefetch>
			<div class="imageContainer">
				<img src={content.thumb} alt={content.title} />
				<Duration duration={content.duration} />
			</div>
			<div class="mdc-typography--caption captionLine">
				<div>{content.channel}</div>
				<div>{languageName}</div>
			</div>
			<div class="mdc-typography--body2 noWrapText">
				{title}
			</div>
			<div class="mdc-typography--caption captionLine">
				{$t('card.words')}: {content.wordCount}
			</div>
		</a>
	{/if}
</div>

<style>
	a {
		text-decoration: none;
		color: unset;
	}
	.card {
		display: block;
		margin: 8px 0px;
		width: 320px;
	}

	@media (max-width: 1920px) {
		.card {
			width: 19%;
		}
	}

	@media (max-width: 1600px) {
		.card {
			width: 24%;
		}
	}

	@media (max-width: 1600px) {
		.card {
			width: 24%;
		}
	}

	@media (max-width: 1280px) {
		.card {
			width: 32%;
		}
	}

	@media (max-width: 960px) {
		.card {
			width: 48%;
		}
	}

	@media (max-width: 480px) {
		.card {
			width: 98%;
		}
	}

	.imageContainer {
		aspect-ratio: 16/9;
		width: 100%;
		position: relative;
		text-align: center;
	}
	.imageContainer img {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		max-height: 100%;
		max-width: 100%;
		height: 100%;
		margin: auto;
	}

	.noWrapText {
		overflow: hidden;
		max-height: 2.75em;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: 'vertical';
	}

	.captionLine {
		display: flex;
		justify-content: space-between;
		align-items: center;
		opacity: 0.7;
	}
</style>
