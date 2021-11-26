<script lang="ts">
	import { t } from '../../i18n/i18n';
	import { knowledgeStore } from '../../data/knowledge';
	import { LanguageCode, languageNames } from '../../types/dictionary.types';
	import LanguageProgress from './languageProgress.svelte';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { settings } from '../../data/settings';
	import type { LanguageKnowledge } from '../../types/knowledge.types';

	const { targetLanguages } = settings;

	let languages: LanguageCode[];
	let activeTab: LanguageCode;

	$: {
		languages = Object.keys($knowledgeStore) as LanguageCode[];
		languages.sort((a, b) => {
			const isLearningA = $targetLanguages.includes(a);
			const isLearningB = $targetLanguages.includes(b);
			if (isLearningA && !isLearningB) return -1;
			if (!isLearningA && isLearningB) return 1;
			const aScores = $knowledgeStore[a]?.scores || {};
			const bScore = $knowledgeStore[b]?.scores || {};
			const aKnown = Object.keys(aScores).filter((key) => aScores[key][0] > 0).length;
			const bKnown = Object.keys(bScore).filter((key) => bScore[key][0] > 0).length;
			return bKnown - aKnown;
		});
		if (!activeTab) activeTab = languages[0];
	}

	function getLanguageName(code: LanguageCode): string {
		return languageNames[code] || code;
	}

	function getWordCount(code: LanguageCode): number {
		const k = $knowledgeStore[code] || ({} as LanguageKnowledge);
		const scores = k.scores || {};
		return Object.keys(scores).filter((word) => scores[word][0] > 0).length;
	}
</script>

<div class="container">
	{#if !languages.length}
		<div class="mdc-typography--body1 error">
			{$t('progress.empty')}
		</div>
	{:else}
		<TabBar tabs={languages} let:tab bind:active={activeTab}>
			<Tab {tab}>
				<Label>{getLanguageName(tab)} ({getWordCount(tab)})</Label>
			</Tab>
		</TabBar>
		<div class="content">
			{#key activeTab}
				<LanguageProgress language={activeTab} />
			{/key}
		</div>
	{/if}
</div>

<style>
	.error {
		padding: 8px;
	}
	.container {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.content {
		max-width: 640px;
		margin: auto;
	}
</style>
