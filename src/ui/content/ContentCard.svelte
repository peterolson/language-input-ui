<script lang="ts">
	import { languageNames } from '../../types/dictionary.types';
	import type { ContentItemSummary } from '../../types/content.types';
	import Duration from './Duration.svelte';
	import { t } from '../../i18n/i18n';
	export let content: ContentItemSummary;
	const languageName = languageNames[content.lang as keyof typeof languageNames];
</script>

<div class="card" title={content.title}>
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
			{content.title}
		</div>
		<div class="mdc-typography--caption captionLine">
			<div>{$t('card.words')}: {content.wordCount}</div>
		</div>
	</a>
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
