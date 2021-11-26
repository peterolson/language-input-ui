<script lang="ts">
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import type { ContentItemSummary, SkeletonItem } from '../../types/content.types';
	import Duration from './Duration.svelte';
	import { t } from '../../i18n/i18n';
	import { SkeletonBlock, SkeletonText } from 'skeleton-elements/svelte';
	import { getKnownPercent, knowledgeStore } from '../../data/knowledge';
	import { settings } from '../../data/settings';
	import { Icon } from '@smui/common';
	import ContinueWatching from './ContinueWatching.svelte';

	const { darkMode, isTraditional } = settings;

	export let content: ContentItemSummary | SkeletonItem;
	let languageName: string = '';
	let title: string = '';
	let percent = 0;
	let color = 'unset';

	$: {
		if ('lang' in content) {
			languageName = languageNames[content.lang as keyof typeof languageNames];
			title = content.title;
			let lemmas = content.lemmas;
			if (content.lang === LanguageCode.Chinese && $isTraditional && content.tradLemmas) {
				lemmas = content.tradLemmas;
			}
			percent = getKnownPercent($knowledgeStore, content.lang as LanguageCode, lemmas);
			const luminosity = $darkMode ? '75%' : '40%';
			const hue = (Math.max(percent * 100 - 70, 0) / 30) * 120;
			color = `hsl(${hue},100%,${luminosity})`;
		}
	}

	function formatPercent(r: number): string {
		return `${(r * 100).toFixed(3)}%`;
	}

	function b(s: string): string {
		return [...s]
			.map((c, i) => {
				if (i % 2 === 0) {
					return ' ';
				}
				return ' ';
			})
			.join('');
	}
</script>

<div class="card" {title}>
	{#if 'skeleton' in content}
		<div class="imageContainer">
			<SkeletonBlock width="100%" height="100%" effect="wave" borderRadius="5px" />
		</div>
		<div class="mdc-typography--caption captionLine">
			<div><SkeletonText effect="wave">{b('English')}</SkeletonText></div>
			<SkeletonText effect="wave">{b('13.000%')}</SkeletonText>
		</div>
		<div class="mdc-typography--caption captionLine">
			<div><SkeletonText effect="wave">{b('Russian with Max')}</SkeletonText></div>
			<SkeletonText effect="wave">{b('Words: 1207')}</SkeletonText>
		</div>
		<div class="mdc-typography--body2 noWrapText">
			<SkeletonText effect="wave">
				{b('This is a very long dummy video title. It should occupy two full lines. Like this.')}
			</SkeletonText>
		</div>
		<div class="mdc-typography--body2 captionLine">
			<div class="iconNumber">
				<SkeletonText effect="wave">
					{b('Views')}
				</SkeletonText>
			</div>
			<div class="iconNumber">
				<SkeletonText effect="wave">
					{b('Downs')}
				</SkeletonText>
			</div>
			<div class="iconNumber">
				<SkeletonText effect="wave">
					{b('Mehs')}
				</SkeletonText>
			</div>
			<div class="iconNumber">
				<SkeletonText effect="wave">
					{b('Likes')}
				</SkeletonText>
			</div>
		</div>
	{:else}
		<a href={`/content/${content._id}`} sveltekit:prefetch>
			<div class="imageContainer">
				<img src={content.thumb} alt={content.title} />
				<ContinueWatching id={content._id} />
				<Duration duration={content.duration} />
			</div>
			<div class="mdc-typography--caption captionLine">
				<div class="secondary">{languageName}</div>
				<div style={`color:${color};font-weight:bold;`}>
					{formatPercent(percent)}
				</div>
			</div>
			<div class="mdc-typography--caption captionLine">
				<div class="secondary">{content.channel}</div>
				<div class="secondary">
					{$t('card.words')}: {content.wordCount}
				</div>
			</div>
			<div class="mdc-typography--body2 noWrapText">
				{title}
			</div>
			<div class="mdc-typography--body2 captionLine">
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
