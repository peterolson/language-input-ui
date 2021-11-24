<script lang="ts">
	import type { KnowledgeScores } from '../../types/knowledge.types';

	import { getBreakdownByCategory, knowledgeStore } from '../../data/knowledge';
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import { t } from '../../i18n/i18n';
	import ProgressCategory from './progressCategory.svelte';
	import { settings } from '../../data/settings';

	export let language: LanguageCode;
	const languageName = languageNames[language];

	const { darkMode } = settings;

	const knowledge = $knowledgeStore[language] || ({} as KnowledgeScores);
	const knownWords = Object.keys(knowledge).filter((word) => knowledge[word][0] > 0);

	let breakdown: { type: string; items: { word: string; score: number; color: string }[] }[];
	$: {
		breakdown = getBreakdownByCategory(knowledge, $darkMode);
	}
</script>

<div class="container">
	<div class="mdc-typography--body1 space-between">
		<span class="title">{languageName}</span>
		<span>{$t('card.words')}: <strong>{knownWords.length}</strong></span>
	</div>
	{#each breakdown as { type, items }}
		<ProgressCategory {type} {items} />
	{/each}
</div>

<style>
	.container {
		padding: 8px;
	}
	.title {
		font-size: 125%;
	}
	.space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
